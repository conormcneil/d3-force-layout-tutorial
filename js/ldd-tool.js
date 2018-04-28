var ldd = 'particle';
var id;

getJson(ldd);

// user actions
$('button').on('click',function(event) {
    if (event.target.id == ldd) return;
    else ldd = event.target.id;
    
    // remove old data
    d3.select('svg').remove();
    
    getJson(ldd);
});

function getJson(id) {
    $.ajax({
        type: "POST",
        url: 'http://localhost:3000/',
        data: {
            id: id
        },
        success: setNodeTypes
    });
};

function setNodeTypes(_json) {
    _json = JSON.parse(_json);
    
    let dd_class = _json['Ingest_LDD']['DD_Class'];
    let dd_attribute = _json['Ingest_LDD']['DD_Attribute'];
    
    _classes = dd_class.concat(dd_attribute);

    // append ldd name to top of d3 container for reference
    $('#ldd-name').text(event.target.id);

    main();
};

function main() {
    var width = $(document).width() - 10,
        height = $(document).height() - 10,
        columnCount,
        activeNode = null,
        _col = 1, // root elements exist in this column

        // Edges (Lines)
        linkHighlightFill = 'orange',
        linkHighlightStrokeWidth = '3px',
        linkStroke = 'black',
        linkStrokeWidth = '1px',

        // Nodes
        rx = 100, // x radius of ellipse
        ry = 30, // y radius of ellipse
        verticalOffset = 50,
        verticalPadding = 5,
        verticalSpacing = ry * 2 + verticalPadding,
        rootNodeFill = 'lightgreen',
        classNodeFill = 'lightblue',
        attributeNodeFill = 'white',
        nodeStroke = 'black',
        nodeStrokeWidth = '1px',
        nodeHighlightStroke = 'orange',
        nodeHighlightStrokeWidth = '5px',
        activeNodes = [],
        
        nodeGen = [],
        nodes = null,
        links = null,
        rootNodes = [],
        dataNodes = [],
        dataLinks = [],
        lidType = null,
        tree = d3.tree()
            .size([height, width]),
        svg = d3.select('body')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('class','grid');

    drawD3();

    function drawD3() {
        initNodesAndLinks();
        setRootNodes();
        sortCols(rootNodes);
        drawGrid();
        initForce();
    };

    function initNodesAndLinks() {
        
        dataNodes = _classes.map(e => {
            let links = e['DD_Association'];
            
            if (links && links.length) {
                e.className = 'class';
            } else {
                e.className = 'attribute';
            }
            
            return e;
            
        });

        dataLinks = [];

        dataNodes.map((e,idx) => {
            
            if (!e.children) e.children = [];
            let targets = e['DD_Association'];

            if (targets && targets.length) {
                targets.map(target => {
                    
                    let targetLid;
                    lidType = 'local_identifier';
                    
                    try {
                        targetLid = target[lidType][0];
                    } catch (e) {
                        lidType = 'identifier_reference';
                        targetLid = target[lidType][0];
                    }
                    
                    // invalid 
                    if (targetLid == 'XSChoice#') return;

                    // search for lid in dataNodes array
                    let match = dataNodes.find(el => {
                        let _output;
                        try {
                            _output = el['local_identifier'][0] === targetLid;
                        } catch (e) {
                            _output = el['identifier_reference'][0] === targetLid;
                        }
                        return _output;
                    });
                    
                    if (!match) {
                        // create new node
                            // in pds namespace
                        target.className = 'attribute';
                        try {
                            target.name = [target['local_identifier'][0].replace('pds.','')];
                        } catch (err) {
                            target.name = [target['identifier_reference'][0].replace('pds.','')];
                        }
                        dataNodes.push(target);
                        // then create a link in dataLinks array
                        let _targetIdx = dataNodes.length - 1;
                        dataLinks.push({ source: idx, target: _targetIdx });
                    } else {
                        dataLinks.push({ source: idx, target: dataNodes.indexOf(match) });
                    }
                    e.children.push(target);
                })
            } else {
                e.children = [];
            }
        });
    };

    function setRootNodes() {
        dataNodes.map((node,idx) => {
            let _match = dataLinks.find(link => link.target == idx);
            if (!_match) {
                node.rootNode = true;
                rootNodes.push(node);
            };
        });
    };

    // set col attribute on each node for use later during positioning
    // recursive function, begin with root nodes
    function sortCols(_nodes) {
        let nextCol = [];
        _col++;

        // for each root element, find its child elements
        _nodes.map(root => {
            let _children = root['DD_Association'];

            if (_children && _children.length) {
                // check that each child exists as an element in dataNodes
                _children.map(_child => {
                    dataNodes.find(dn => {
                        let dnLid,
                            _childLid;

                        try {
                            dnLid = dn.local_identifier[0];
                        } catch (e) {
                            dnLid = dn.identifier_reference[0];
                        }

                        try {
                            _childLid = _child.local_identifier[0];
                        } catch (e) {
                            _childLid = _child.identifier_reference[0];
                        }

                        let _match = dnLid == _childLid;

                        // if it exists, set its class
                        // then pass it into array for storage
                        // to be passed into recursive function upon completion of find() method
                        if (_match) {
                            let _lid;

                            try {
                                _lid = dn['local_identifier'][0];
                            } catch (e) {
                                _lid = dn['identifier_reference'][0];
                            }

                            let _localNode = getNodeByLid(_lid);
                            _localNode.col = _col;

                            // push node object to array of nodes in this column
                            // perform the same sequence of steps for each node
                            // in the new array
                            nextCol.push(dn);
                        }

                        return _match;
                    })
                });
            }
        });

        if (nextCol.length) sortCols(nextCol);
    };

    function drawGrid() {
        var sim = d3.select('svg');

        var zoom = d3.zoom()
            .scaleExtent([0.1,10])
            .translateExtent([[-1.5*width,-2*height], [2.5*width, 2*height]])
            .on('zoom',zoomed);

        var x = d3.scaleLinear()
            .domain([-1, width + 1])
            .range([-1, width + 1]);

        var y = d3.scaleLinear()
            .domain([-1, height + 1])
            .range([-1, height + 1]);

        var xAxis = d3.axisBottom(x)
            .ticks((width + 2) / (height + 2) * 10)
            .tickSize(height)
            .tickPadding(8 - height);

        var yAxis = d3.axisRight(y)
            .ticks(10)
            .tickSize(width)
            .tickPadding(8 - width);

        var gX = sim.append('g')
            .attr('class','axis axis--x')
            .call(xAxis);

        var gY = sim.append('g')
            .attr('class','axis axis--y')
            .call(yAxis);

        sim.call(zoom);

        function zoomed() {
            gX.call(xAxis.scale(d3.event.transform.rescaleX(x)));
            gY.call(yAxis.scale(d3.event.transform.rescaleY(y)));
            svg.attr('transform',d3.event.transform);
        };

        // TODO repair and implement this
        function resetted() {
            sim.transition()
                .duration(750)
                .call(zoom.transform, d3.zoomIdentity);
        };
    };


    function initForce() {
        _col = 1;
        activeNode = null;

        var link = svg.selectAll('.link')
            .data(dataLinks);

        var node = svg.selectAll('g')
            .data(dataNodes);

        var linkEnter = link
            .enter().append('path')
            .attr('class', 'link');

        var nodeEnter = node
            .enter().append('g')
            .classed('node', true)
            .on('click', toggleNodes)
            .attr('id', function(d) {
                let _id;

                try {
                    _id = d['local_identifier'][0].replace('.', '-');
                } catch (e) {
                    _id = d['identifier_reference'][0].replace('.', '-');
                }

                return _id;
            });

        // configure behavior when nodes enter
        // append ellipse to each node group
        nodeEnter
            .append('ellipse')
            .attr('rx', rx)
            .attr('ry', ry)
            .attr('class', 'circle')
            .style('stroke', nodeStroke)
            .style('fill', highlightNode);
        // append text to each node group
        nodeEnter
            .append('text')
            .text(function(d) {
                return d.name[0];
            });
        nodeEnter
            .attr('transform',function(d, idx) {
                // configure horiontal (x) position
                let colWidth = 500;
                let xOffset = 300;

                if (d.rootNode) d.x = colWidth - xOffset;
                else d.x = d.col * colWidth - xOffset;

                // configure vertical (y) position
                d.y = verticalOffset + idx * verticalSpacing;
                return `translate(${d.x},${d.y})`;
            });

        // configure behavior when links enter
        linkEnter
            .attr('d', d3.linkHorizontal()
                .x(function(d) {
                    return getNodeByIdx(d).x;
                })
                .y(function(d) {
                    return getNodeByIdx(d).y;
                })
            )
            .attr('fill','none')
            .attr('stroke',linkStroke)
            .attr('stroke-width',linkStrokeWidth);
    };

    function toggleNodes(node) {
        activeNodes = [];

        let g1 = [node];
        let g2 = nextGen(g1);
        let g3 = nextGen(g2);

        if (activeNode == node) {
            activeNode = null;
            nodeGen = [];
        } else {
            nodeGen = g1.concat(g2);
            activeNode = node;
            activeNodes = activeNodes
                .concat(g1)
                .concat(g2)
                .concat(g3);
        }

        svg.selectAll('.link')
            .style('stroke', highlightLine)
            .style('stroke-width',function(link) {
                let _lid = getNodeByIdx(link.source)['local_identifier'][0];
                
                return activeNodes.find(d => {
                    return d['local_identifier'][0] == _lid;
                }) ? linkHighlightStrokeWidth : linkStrokeWidth;
            });

        svg.selectAll('.circle')
            .style('stroke', function(d) {
                let _lid = d['local_identifier'][0];
            
                return activeNodes.find(e => { return e['local_identifier'][0] == _lid; }) ? nodeHighlightStroke : nodeStroke;
            })
            .style('stroke-width', function(d) {
                let _lid = d['local_identifier'][0];
                
                return activeNodes.find(e => { return e['local_identifier'][0] == _lid; }) ? nodeHighlightStrokeWidth : nodeStrokeWidth;
            })
    };

    function highlightLine(_link) {
        let _lid = getNodeByIdx(_link.source)['local_identifier'][0];

        if (nodeGen.indexOf(_lid) != -1) return linkHighlightFill;
        else return linkStroke;
    };

    function highlightNode(n) {
        let _color,
            _lid;

        try {
            _lid = n['local_identifier'][0];
        } catch (e) {
            _lid = n['identifier_reference'][0];
        }

        if (n.rootNode) _color = rootNodeFill;
        else if (n.className == 'class') _color = classNodeFill;
        else _color = attributeNodeFill;

        return _color;
    };

    function nextGen(parent) {
        let _nextGen = [];

        dataLinks.map(link => {
            let source = getNodeByIdx(link.source);
            let target = getNodeByIdx(link.target);

            if (parent && parent.indexOf(source) != -1 && _nextGen.indexOf(target) == -1) {
                _nextGen.push(target);
            }
        });

        return _nextGen;
    };

    function getNodeByIdx(nodeIdx) {
        return dataNodes[nodeIdx];
    };

    function getNodeByLid(lid) {
        return dataNodes.find(d => {
            let _o;
            
            try {
                _o = d['local_identifier'][0] == lid;
            } catch (e) {
                _o = d['identifier_reference'][0] == lid;
            }
            
            return  _o;
        });
    };
};