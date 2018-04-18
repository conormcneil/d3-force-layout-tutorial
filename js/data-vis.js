var width = $(document).width() - 10,
    height = $(document).height() - 10,
    radius = 5,
    columnCount,
    activeNode = null,
    _col = 1; // root elements exist in this column

var svg = d3.select('body').append('svg')
.attr('width',width)
.attr('height',height)
.call(d3.behavior.zoom().on("zoom", function () {
    svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
}))
.append('g');

var fill = d3.scale.category20();

function initForce() {
    
    _col = 1;
    activeNode = null;

    var force = d3.layout.force()
        .charge(-1000)
        .linkStrength(1)
        .size([width, height]);

    var links = svg.selectAll('.link')
        .data(dataLinks)
        .enter().append('line')
        .attr('class','link');

    var nodes = svg.selectAll('g')
        .data(dataNodes)
        .enter().append('g')
        .classed('node',true)
        .on('click',toggleNodes)
        .attr('id',function(d) {
            return d.local_identifier[0].replace('.','-');
        })
        
    nodes
        .append('circle')
            .attr('r', radius)
            .attr('class','circle')
            .style('fill', defaultNodeFills)
            .style('stroke', function(d) { return d3.rgb(fill(d.group)).darker(); });
            
    nodes
        .append('text')
            .attr('dx',function(d) { return d.x; })
            .attr('dy',function(d) { return d.y; })
            .text(function(d) { return d.name[0]; })

    // nodes.call(force.drag)
    
    force
        .nodes(dataNodes)
        .links(dataLinks)
        .on('tick', tick)
        .start();
    
    let firstTick = true;

    function tick(e) {
        
        var k = 10 * e.alpha;
        
        nodes
            .each(function(d,idx) {
                let className = d3.select(this).attr('class');
                let colWidth = width / (_col);
                
                if (d.rootNode) return d.x = colWidth;
                else if (/col-/g.test(className)) {
                    let col = className.match(/[0-9]/g).join('');
                    return d.x = col * colWidth;
                };
            })
            .attr('x1', function(d) { return d.x; })
            .attr('y1', function(d) { return d.y; })

        links
            .attr('x1', function(d) { return d.source.x; })
            .attr('y1', function(d) { return d.source.y; })
            .attr('x2', function(d) { return d.target.x; })
            .attr('y2', function(d) { return d.target.y; })

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
                        let _lid = dn.local_identifier[0].replace('.','-');
                        let _localNode = d3.select(`#${_lid}`)
                            .attr('class',function(d) { 
                                // console.log(d);
                                return `node col-${_col}`; });
                        
                        // push node object to array of nodes in this column
                            // perform the same sequence of steps for each node
                            // in the new array
                        nextCol.push(dn);
                    }
                    
                    return _match;
                })
            });
        }
    })
    if (nextCol.length) nodeClasses(nextCol);
};
function defaultNodeFills(d) {
    if (d.rootNode) return 'green';
    else if (d.className == 'class') return fill(d.group);
    else return 'white';
};
function defaultFills() {
    d3.selectAll('.circle').style('fill',defaultNodeFills);
};

function toggleNodes(node) {
    if (activeNode == node) {
        activeNode = null;
        return defaultFills();
    }
    // set all fills to default values
    defaultFills();
    
    // customize new fills
    // fill selected node
    d3.select(`#${this.id}`)
        .select('.circle')
        .style('fill','red');

    let childNodes = node.children;
    let grandchildren = [];
    let desc;
    
    if (childNodes && childNodes.length) grandchildren = getGrandkids();
    
    function getGrandkids() {
        let _g2 = [];
        childNodes.map(child => {
            let _test = dataNodes.find(dn => {
                return dn.local_identifier[0] == child;
            });
            if (_test && _test.children) {
                _test.children.map(gkid => {
                    if (_g2.indexOf(gkid) == -1) {
                        _g2.push(gkid);
                    }
                })
            }
        })
        return _g2;
    }
    
    if (grandchildren.length) desc = childNodes.concat(grandchildren);
    else desc = childNodes;
    
    if (desc && desc.length) desc.map(_d => {

        _d = _d.replace('.','-');
        d3.select(`#${_d}`)
            .select('.circle')
            .style('fill','red');
    });
    
    activeNode = node;
};