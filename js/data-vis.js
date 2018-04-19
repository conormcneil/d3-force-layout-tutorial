var width = $(document).width() - 10,
    height = $(document).height() - 10,
    columnCount,
    activeNode = null,
    _col = 1, // root elements exist in this column

    // Edges (Lines)
    lineHighlightFill = 'orange',
    lineHighlightWidth = 5,
    lineStroke = 'black',
    lineStrokeWidth = 1,

    // Nodes
    rx = 100, // x radius of ellipse
    ry = 30, // y radius of ellipse
    verticalOffset = 50;
    verticalPadding = 5,
    verticalSpacing = ry * 2 + verticalPadding,
    nodeHighlightFill = 'orange',
    rootNodeFill = 'lightgreen',
    classNodeFill = 'lightblue',
    attributeNodeFill = 'white',
    nodeStroke = 'black',
    activeNodes = [],
    nodeGen = [];


var svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height)
    .call(d3.behavior.zoom().on("zoom", function() {
        svg.attr("transform", `translate(${d3.event.translate}) scale(${d3.event.scale})`)
    }))
    .append('g');

function initForce() {

    _col = 1;
    activeNode = null;

    var force = d3.layout.force()
        .size([width, height])
        .nodes(dataNodes)
        .links(dataLinks);

    var links = svg.selectAll('.link')
        .data(dataLinks)
        .enter().append('line')
        .attr('class', 'link')
        .style('stroke-width', lineStrokeWidth)
        .style('stroke', lineStroke);

    var nodes = svg.selectAll('g')
        .data(dataNodes)
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

    // configure class for each node
    // corresponding to its position relative to root node
    // this is used later for *horizontal* positioning of the nodes
    nodeClasses(rootNodes);

    nodes
        .append('ellipse')
        .attr('rx', rx)
        .attr('ry', ry)
        .attr('class', 'circle')
        .style('stroke', nodeStroke)
        .style('fill', highlightNode);

    nodes
        .append('text')
        .attr('dx', function(d) {
            return d.x;
        })
        .attr('dy', function(d) {
            return d.y;
        })
        .text(function(d) {
            return d.name[0];
        });

    nodes
        .each(function(d, idx) {
            // configure horiontal (x) position
            let className = d3.select(this).attr('class');
            let colWidth = 500;

            if (d.rootNode) d.x = colWidth - 300;
            else if (/col-/g.test(className)) {
                let col = className.match(/[0-9]/g).join('');
                d.x = col * colWidth - 300;
            };

            // configure vertical (y) position
            d.y = verticalOffset + idx * verticalSpacing;
        })
        .attr('x1', function(d) {
            return d.x;
        })
        .attr('y1', function(d) {
            return d.y;
        });

    force.start();

    // position nodes and links
    // NODES
    nodes
        .attr('transform', function(d) {
            let x = d.x;
            let y = d.y;
            return `translate(${x},${y}) rotate(0)`;
        });
    // LINKS
    links
        .attr('x1', function(d) {
            return d.source.x;
        })
        .attr('y1', function(d) {
            return d.source.y;
        })
        .attr('x2', function(d) {
            return d.target.x;
        })
        .attr('y2', function(d) {
            return d.target.y;
        });
};

// set node classes for use later during positioning
// begin with root nodes
function nodeClasses(_nodes) {
    let nextCol = [];
    _col++;

    // for each root element, find its child elements
    _nodes.map(root => {
        let _children = root['DD_Association'];

        // check that each child exists as an element in dataNodes
        if (_children && _children.length) {
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
                            _lid = dn['local_identifier'][0].replace('.', '-');
                        } catch (e) {
                            _lid = dn['identifier_reference'][0].replace('.', '-');
                        }

                        let _localNode = d3.select(`#${_lid}`)
                            .attr('class', function(d) {
                                // console.log(d);
                                return `node col-${_col}`;
                            });

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

    if (nextCol.length) nodeClasses(nextCol);
};

function toggleNodes(node) {
    activeNodes = [];

    let g1 = node['local_identifier'];
    let g2 = node['children'];
    let g3 = getNextGen(g2);

    if (activeNode == node) {
        activeNode = null;
        nodeGen = [];
    } else {
        nodeGen = g1.concat(g2);
        activeNode = node;
        activeNodes = activeNodes.concat(g1)
            .concat(g2)
            .concat(g3);
    }

    svg.selectAll('.link')
        .style('stroke', highlightLine);

    svg.selectAll('.circle')
        .style('fill', highlightNode);
};

function highlightLine(_link) {
    let _lid = _link.source['local_identifier'][0];

    if (nodeGen.indexOf(_lid) != -1) return lineHighlightFill;
    else return lineStroke;
};

function highlightNode(n) {
    let _color,
        _lid;

    try {
        _lid = n['local_identifier'][0];
    } catch (e) {
        _lid = n['identifier_reference'][0];
    }

    if (activeNodes.indexOf(_lid) != -1) _color = nodeHighlightFill;
    else if (n.rootNode) _color = rootNodeFill;
    else if (n.className == 'class') _color = classNodeFill;
    else _color = attributeNodeFill;

    return _color;
};

function getNextGen(gen) {
    let _nextGen = [];

    dataLinks.map(link => {
        let _sourceLid = link.source['local_identifier'][0];
        let _targetLid = link.target['local_identifier'][0];

        if (gen && gen.indexOf(_sourceLid) != -1 && _nextGen.indexOf(_targetLid) == -1) _nextGen.push(_targetLid);
    });

    return _nextGen;
};