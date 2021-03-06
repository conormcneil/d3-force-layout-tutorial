var id,
    data,
    svg,
    ldd = 'particle',
    toolbarWidth = '400',
    width = $(document).width() - toolbarWidth,
    height = $(document).height(),
    activeNode = null,
    tDuration = 1000, // transition duration (ms)
    // click event variables
    delay = 500, // double click delay (ms)
    clicks = 0,
    timer = null,
    // Edges (Lines)
    linkHighlightStroke = 'orange',
    linkHighlightStrokeWidth = '5px',
    linkStroke = 'black',
    linkStrokeWidth = '1px',
    linkMode = false,
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
    lidType = null,
    zoomScale = [0.1, 10],
    tree = d3.tree()
        .size([height, width]),
    zoomBounds = [
        [-20 * width, -10 * height],
        [10 * width, 40 * height]
    ]; // [[-x,y],[x,-y]]

initGrid();

getJson(ldd);

function getJson(id) {
    $.ajax({
        type: "POST",
        url: 'http://localhost:3000/',
        data: {
            id: id
        },
        success: main
    });
};

function main(json) {
    data = new Data(json);

    // remove old tree
    d3.select('.tree').remove();

    svg = d3.select('.main')
        .append('g')
        .attr('class', 'tree');

    update();
    
    updateToolbar(null);
};

function update() {
    var tIn = d3.transition()
        .duration(1000);

    var tOut = d3.transition()
        .duration(1000);

    var link = svg.selectAll('.link')
        .data(data.links,function(l,idx) {
            return l.id;
        })
        .datum(function(l,i,nodes) {
            // update link values to reflect new data indices
            let st = l.id.split(':');
            let s = data.getNode(st[0],true);
            let t = data.getNode(st[1],true);
            
            l.source = s;
            l.target = t;
            
            return l;
        });

    var node = svg.selectAll('g')
        .data(data.nodes,function(d,idx) {
            // this is update because:
            // on enter(), these nodes don't actually exist yet
            let lidId;
            
            try {
                lidId = d['local_identifier'][0];
            } catch (err) {
                lidId = d['identifier_reference'][0];
            }
            
            // configure horiontal (x) position
            let colWidth = 500;
            let xOffset = 300;

            if (d.rootNode) d.x = colWidth - xOffset;
            else d.x = d.col * colWidth - xOffset;

            // configure vertical (y) position
            d.y = verticalOffset + idx * verticalSpacing;
            
            d.lid = lidId;

            return d.lid;
        });

    var linkEnter = link
        .enter().append('path')
        .attr('class', 'link')
        .style('opacity',1e-6);
    
    linkEnter.transition(tIn)
        .delay(100)
        .style('opacity',1);

    var nodeEnter = node
        .enter().append('g')
        .classed('node', true)
        .on('click', toggleNodes)
        .attr('id', function(d) {
            let _id;

            try {
                _id = d['local_identifier'][0].replace('.', '-');
            } catch (err) {
                _id = d['identifier_reference'][0].replace('.', '-');
            }

            return _id;
        })
        .style('opacity',1e-6)
        .attr('transform', function(d,idx) {
            return `translate(${d.x,d.y})`;
        });
    
    nodeEnter.transition(tIn)
        .style('opacity',1)
    
    // configure behavior when nodes enter
    // append ellipse to each node group
    nodeEnter
        .append('ellipse')
        .attr('class', 'circle')
        .style('stroke', nodeStroke)
        .style('fill', highlightNode)
        .attr('rx',1e-6)
        .attr('ry',1e-6)
        .transition(tIn)
        .attr('rx', rx)
        .attr('ry', ry)
        
    // append text to each node group
    nodeEnter
        .append('text')
        .text(function(d) {
            return d.name[0];
        })
        .style('font-size', function(d) {
            let maths = Math.min(2 * ry, (2 * ry) / this.getComputedTextLength() * 40);
            return `${maths}px`;
        })
        .attr('dx', '-75px')
        .attr('dy', '.25em')
        .style('opacity',1e-6)
        .transition(tIn)
        .delay(750)
        .style('opacity',1);
    nodeEnter
        .attr('transform', function(d, idx) {
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
        .attr('fill', 'none')
        .attr('stroke', linkStroke)
        .attr('stroke-width', linkStrokeWidth);
    
    // // // REMOVE // // //
    var nodeExit = node.exit()
        .transition(tOut)
        .style('opacity',1e-6)
        .remove();
    
    var linkExit = link.exit()
        .transition(tOut)
        .style('opacity',1e-6)
        .remove();
    
    // TODO transition on update here:
    node
        .transition()
        .duration(750)
        .delay(1000)
        .attr('transform',function(d) {
            return `translate(${d.x},${d.y})`;
        });
    
    link
        .transition()
        .duration(750)
        .delay(1000)
        .attr('d', d3.linkHorizontal()
            .x(function(l,idx) {
                return getNodeByIdx(l).x;
            })
            .y(function(l,idx) {        
                return getNodeByIdx(l).y;
            })
        );
};

function initGrid() {
    var sim = d3.select('svg')
        .attr('width', width)
        .attr('height', height);

    var zoom = d3.zoom()
        .scaleExtent(zoomScale)
        .translateExtent(zoomBounds)
        .on('zoom', zoomed);

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
        .attr('class', 'axis axis--x')
        .call(xAxis);

    var gY = sim.append('g')
        .attr('class', 'axis axis--y')
        .call(yAxis);

    sim.call(zoom)
        .on('dblclick.zoom', null);

    function zoomed() {
        gX.call(xAxis.scale(d3.event.transform.rescaleX(x)));
        gY.call(yAxis.scale(d3.event.transform.rescaleY(y)));
        svg.attr('transform', d3.event.transform);
    };
};

var g1,
    g2,
    g3;
function toggleNodes(node) {
    if (linkMode) return data.createLink(node);
    
    if (!node.lid) {
        try {
            node.lid = node['local_identifier'][0];
        } catch (err) {
            node.lid = node['identifier-reference'][0];
        }
    }
    
    activeNodes = [];

    if (activeNode == node) {
        updateToolbar(null);
        activeNode = null;
        nodeGen = [];
    } else if (!node) {
        g2 = nextGen(g1);
        g3 = nextGen(g2);
        nodeGen = g1.concat(g2);
        activeNodes = activeNodes
            .concat(g1)
            .concat(g2)
            .concat(g3);
        updateToolbar();
    } else {
        g1 = [node];
        g2 = nextGen(g1);
        g3 = nextGen(g2);
        nodeGen = g1.concat(g2);
        var nodeIdx = data.getNode(node.lid,true);
        activeNode = data.nodes[nodeIdx];
        activeNode.parents = data.getParents(nodeIdx);
        activeNodes = activeNodes
            .concat(g1)
            .concat(g2)
            .concat(g3);
        updateToolbar();
    }

    svg.selectAll('.link')
        .style('stroke', function(link) {
            let _lid;
            
            try {
                _lid = getNodeByIdx(link.source)['local_identifier'][0];
            } catch (err) {
                _lid = getNodeByIdx(link.source)['identifier_reference'][0];
            }
            
            return nodeGen.find(d => {
                try {
                    return d['local_identifier'][0] == _lid;
                } catch (err) {
                    return d['identifier_reference'][0] == _lid;
                }
            }) ? linkHighlightStroke : linkStroke;
        })
        .style('stroke-width', function(link) {
            let _lid;
            
            try {
                _lid = getNodeByIdx(link.source)['local_identifier'][0];
            } catch (err) {
                _lid = getNodeByIdx(link.source)['identifier_reference'][0];
            }
            
            return nodeGen.find(d => {
                try {
                    return d['local_identifier'][0] == _lid;
                } catch (err) {
                    return d['identifier_reference'][0] == _lid;
                }
            }) ? linkHighlightStrokeWidth : linkStrokeWidth;
        });

    svg.selectAll('.circle')
        .style('stroke', function(d) {
            let _lid;

            try {
                _lid = d['local_identifier'][0];
            } catch (err) {
                _lid = d['identifier_reference'][0];
            }

            return activeNodes.find(e => {
                try {
                    return e['local_identifier'][0] == _lid;
                } catch (err) {
                    return e['identifier_reference'][0] == _lid;
                }
            }) ? nodeHighlightStroke : nodeStroke;
        })
        .style('stroke-width', function(d) {
            let _lid;

            try {
                _lid = d['local_identifier'][0];
            } catch (err) {
                _lid = d['identifier_reference'][0];
            }

            return activeNodes.find(e => {
                try {
                    return e['local_identifier'][0] == _lid;
                } catch (err) {
                    return e['identifier_reference'][0] == _lid;
                }
            }) ? nodeHighlightStrokeWidth : nodeStrokeWidth;
        })
};

function highlightNode(n) {
    let _color,
        _lid;

    try {
        _lid = n['local_identifier'][0];
    } catch (err) {
        _lid = n['identifier_reference'][0];
    }

    if (n.rootNode) _color = rootNodeFill;
    else if (n.className == 'class') _color = classNodeFill;
    else _color = attributeNodeFill;

    return _color;
};

function nextGen(parent) {
    let _nextGen = [];

    data.links.map(link => {
        let source = getNodeByIdx(link.source);
        let target = getNodeByIdx(link.target);

        if (parent && parent.indexOf(source) != -1 && _nextGen.indexOf(target) == -1) {
            _nextGen.push(target);
        }
    });

    return _nextGen;
};

function getNodeByIdx(nodeIdx) {
    return data.nodes[nodeIdx];
};

function updateToolbar(flag) {
    if (flag === null) return defaultToolbar();
    else if (linkMode) return linkModeToolbar();
    else return nodeToolbar();
    
    function defaultToolbar() {
        resetToolbar();
        
        $('#tools').load('partials/tools.default.html', function() {
            $('#active-node-title').text('LD3 Tool')
        });
    };
    
    function nodeToolbar() {
        resetToolbar();
        
        $('#tools').load('partials/tools.node.html',function() {
            var node = activeNode;
            // update toolbar - node title
            $('#active-node-title').text(node.lid);
            
            // update toolbar - node children
            if (node.children) {
                $('#active-children-title').text(`Children (${node.children.length})`);
                
                node.children.map(a => {
                    $('#active-node-children').append(newActiveChild(a));
                });
            } else {
                $('#active-children-title').text(`Children (0)`);
            }
            
            // update toolbar - node parents
            if (node.parents) {    
                $('#active-parents-title').text(`Parents (${node.parents.length})`);
                
                node.parents.map(p => {
                    $('#active-node-parents').append(newActiveChild(p));
                });
            } else {
                $('#active-parents-title').text(`Parents (0)`);
            }
            
            addListeners();
        });
    };
    
    function linkModeToolbar() {
        $('#tools').load('partials/tools.link-mode.html');
    };
    
    function resetToolbar() {
        $('#active-node-title').empty();
        $('#active-children-title').empty();
        $('#active-parents-title').empty();
        $('#active-node-children').empty();
        $('#active-node-parents').empty();
        $('#create-node').remove();
    };
};

// TODO create partial, fill in values with jQuery
function newActiveChild(node) {
    let childLid,
        htmlChildLid;
        
    let keys = ['reference_type','minimum_occurrences','maximum_occurrences'];
    
    try {
        childLid = node['local_identifier'][0];
        keys.unshift('local_identifier');
    } catch (err) {
        childLid = node['identifier_reference'][0];
        keys.unshift('identifier_reference');
    }
    
    htmlChildLid = childLid.replace('.','-');
    
    let childTitle = `<h3 id="childTitle">${childLid}</h3>`;
    
    let reference_type = node['reference_type'];
    let minOcc = node['minimum_occurrences'];
    let maxOcc = node['maximum_occurrences'];
    
    let values = '<div class="child-keys">';
    values += `<label class="child-key" for="${keys[0]}">${keys[0]}: <input type="text" id="${childLid}" name="${childLid}" value="${childLid}"></label>`;
    values += `<label class="child-key" for="${keys[2]}">${keys[2]}: <input type="text" id="${minOcc}" name="${minOcc}" value="${minOcc}"></label>`;
    values += `<label class="child-key" for="${keys[3]}">${keys[3]}: <input type="text" id="${maxOcc}" name="${maxOcc}" value="${maxOcc}"></label>`;
    values += `</div>`;
    
    let childButtons = `<div class="active-child-buttons ${htmlChildLid}"><i class="fas fa-lg fa-trash-alt"></i></div>`;
    
    return `<form name="${childLid}-form" class="active-child">${childTitle}${values}${childButtons}</form>`;
};

function addListeners() {
    $('#cancel').on('click', closeModal);

    $('#next').on('click', next);

    $('#save').on('click', saveNode);
    
    $('#create-node').on('click', data.createNode);
    
    $('#create-link').on('click', data.linkMode);
    
    // add event listeners to trash icons now that they exist in DOM
    $('.fa-trash-alt').on('click',function(event) {
        let target = event.target;
        let _confirm = confirm('Are you sure you want to delete this node?');

        if (_confirm) {
            let deleteLid = $(target).parent().attr('class').split(' ')[1].trim().replace('-','.');
            data.deleteNode(deleteLid);
            toggleNodes();
        } else {
            return;
        }
    });

    $('#download').on('click',function() {
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/jsontoxml',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(data.pureModel()),
            success: function(res) {
                var blob = new Blob([res], {type: "text/xml;charset=utf-8"});
                saveAs(blob,'ldd.out.xml');
                data.defineNodesAndLinks();
            }
        });
    });
};