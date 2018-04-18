var width = $(document).width() - 10,
    height = $(document).height() - 10,
    radius = 20,
    columnCount,
    activeNode = null,
    _col = 1; // root elements exist in this column

var svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height)
    .call(d3.behavior.zoom().on("zoom", function() {
        svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
    }))
    .append('g');

var fill = d3.scale.category20();

function initForce() {

    _col = 1;
    activeNode = null;

    var force = d3.layout.force()
        .charge(-3000)
        .linkStrength(0.5)
        .size([width, height]);

    var links = svg.selectAll('.link')
        .data(dataLinks)
        .enter().append('line')
        .attr('class', 'link')
        .style('stroke-width',2)
        .style('stroke','black');

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
        })

    nodes
        .append('ellipse')
        .attr('rx', 5*radius)
        .attr('ry',   radius)
        .attr('class', 'circle')
        .style('fill', highlightNodes)
        .style('stroke', function(d) {
            return d3.rgb(fill(d.group)).darker();
        });

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
        })

    force
        .nodes(dataNodes)
        .links(dataLinks)
        .on('tick', tick)
        .start();

    let firstTick = true;

    function tick(e) {

        var k = 10 * e.alpha;

        nodes
            .each(function(d, idx) {
                let className = d3.select(this).attr('class');
                let colWidth = 1.5*width / _col;

                if (d.rootNode) return d.x = colWidth;
                else if (/col-/g.test(className)) {
                    let col = className.match(/[0-9]/g).join('');
                    return d.x = col * colWidth;
                };
            })
            .attr('x1', function(d) {
                return d.x;
            })
            .attr('y1', function(d) {
                return d.y;
            })

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
            })

        svg.selectAll('.node')
            .attr('transform', function(d) {
                let x = d.x;
                let y = d.y;
                return `translate(${x},${y}) rotate(0)`;
            });

        if (firstTick) {
            firstTick = false;
            nodeClasses(rootNodes);
        };

    };
};

// set node classes for use later during positioning
// begin with root nodes
function nodeClasses(_nodes) {
    let nextCol = [];
    _col++;

    // for each root element, find its child elements
    _nodes.map(root => {
        // this array (_children) is not the same as the dataNodes array
        // values that exist here must be mapped to dataNodes elements
        // and node classes are added there
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
    if (activeNode == node) {
        activeNode = null;
        // return defaultFills()
    }
    
    let g1 = node['local_identifier'];
    let g2 = node['children'];
    let g = g1.concat(g2);
    
    highlightEdges(g);
    highlightNodes();

    activeNode = node;
};

// edges
let lineHighlightFill = 'red';
let lineHighlightWidth = 5;
let lineFill = 'green';
let lineWidth = 1;
// nodes
let nodeHighlightFill = 'red';
let activeNodes = []

function highlightEdges(arr) {
    let _edges = [];

    // for each node, find all links where it is a source
    arr.map(el => {
        dataLinks.map(_link => {
            let t = _link.source['local_identifier'][0];
            
            if (t == el) _edges.push(_link);
        });
    });
    
    svg.selectAll('.link')
        .style('stroke-width',l => {
            let highlight = _edges.indexOf(l);
            
            return (highlight != -1) ? lineHighlightWidth : lineWidth;
        })
        .style('stroke',l => {
            let highlight = _edges.indexOf(l);
            
            if (highlight != -1) return lineHighlightFill;
        })
        
};

function highlightNodes() {
    svg.selectAll('.circle')
        .style('fill',n => {
            let _lid = n['local_identifier'][0];
            
            if (activeNodes.indexOf(_lid) != -1) {
                // console.log('red');
                return 'red';
            } else if (n.rootNode) {
                // console.log('lightgreen');
                return 'lightgreen';
            } else if (n.className == 'class') {
                // console.log('group');
                return fill(n.group);
            } else {
                if (_lid == 'pds.description') {
                    console.log('here we are');
                }
                return 'white';
            }
        })
}