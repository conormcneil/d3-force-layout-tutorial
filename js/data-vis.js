var width = $(document).width() - 10,
    height = $(document).height() - 10,
    radius = 10,
    columnCount;

var svg = d3.select('body').append('svg')
.attr('width',width)
.attr('height',height);

var fill = d3.scale.category20();

function initForce() {

    var force = d3.layout.force()
        .charge(-2000)
        .linkStrength(0.75)
        .size([width, height]);

    var links = svg.selectAll('.link')
        .data(dataLinks)
        .enter().append('line')
        .attr('class','link');

    var nodes = svg.selectAll('g')
        .data(dataNodes)
        .enter().append('g')
        .classed('node',true)
        .on('click',function(node) {
            // set all fills to default values
            d3.selectAll('.circle').style('fill',defaultNodeFills);
            
            // customize new fills
            // fill selected node
            d3.select(`#${this.id}`)
                .select('.circle')
                .style('fill','red');
            // fill child nodes
            let childNodes = node.children;
            if (childNodes && childNodes.length) childNodes.map(child => {
                child = child.replace('.','-');
                d3.select(`#${child}`)
                    .select('.circle')
                    .style('fill','red')
            })
        })
        .attr('id',function(d) {
            return d.local_identifier[0].replace('.','-');
        });
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

    nodes.call(force.drag)
    
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
                
                // if (className.match(/col-/g))
                // console.log();
                if (/col-/g.test(className)) {
                    let col = className.match(/[0-9]/g)[0];
                    return d.x = col * 100;
                };
                
                if (d.rootNode) return d.x = 100;
                (idx % 2 == 0) ? d.x = 2*width/5 : d.x = 3*width/5;
            })
            .attr('x1', function(d) { return d.x; })
            .attr('y1', function(d) { return d.y; })

        links
            .each(function(d,idx) {
                d.source.x -= 2*k;
                d.target.x += 2*k;
                
                d.source.y -=   k;
                d.source.y +=   k;
            })
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
            nodeClasses();
        };
        
    };
    
    function defaultNodeFills(d) {
        if (d.rootNode) return 'green';
        else if (d.className == 'class') return fill(d.group);
        else return 'white';
    }
};

let _col = 1; // root elements exist in this column
// set node classes for use later during positioning
    // begin with root nodes
function nodeClasses() {
    _col++;
    // for each root element, find its child elements
    rootNodes.map(root => {
        // this array (_children) is not the same as the dataNodes array
            // values that exist here must be mapped to dataNodes elements
            // and node classes are added there
        let _children = root['DD_Association'];
        // console.log(_children);
        
        // check that each child exists as an element in dataNodes
        _children.map(_child => {
            dataNodes.find(dn => {
                let _test = dn.local_identifier[0] == _child.local_identifier[0];
                
                if (_test) {
                    let _lid = dn.local_identifier[0].replace('.','-');
                    d3.select(`#${_lid}`)
                        .attr('class',function(d) { return `node col-${_col}`; });
                }
                
                return _test
            })
        });
    })
}
