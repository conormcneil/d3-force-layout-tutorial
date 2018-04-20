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

var diagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.y, d.x]; });

function initForce() {

    _col = 1;
    activeNode = null;

    var force = d3.layout.force()
        .size([width, height])
        .nodes(dataNodes)
        .links(dataLinks);

    var link = svg.selectAll('.link')
        .data(dataLinks);

    var node = svg.selectAll('g')
        .data(dataNodes);

    var linkEnter = link
        // .enter().insert('path','g')
        .enter().append('line')
        .attr('class', 'link')
        .style('stroke-width', lineStrokeWidth)
        .style('stroke', lineStroke)
        // .attr('d', function(d) {
        //     console.log(getNodeByIdx(d.source).x);
        //     var o = {x:d.source.x,y:d.source.y};
        //     console.log(o);
        //     return diagonal({source:o,target:o});
        // });

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
        .attr('x1', function(d) {
            return getNodeByIdx(d.source).x;
        })
        .attr('y1', function(d) {
            return getNodeByIdx(d.source).y;
        })
        .attr('x2', function(d) {
            return getNodeByIdx(d.target).x;
        })
        .attr('y2', function(d) {
            return getNodeByIdx(d.target).y;
        });

    force.start();
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