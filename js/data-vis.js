var width = 1200,
height = 800,
radius = 10;

var svg = d3.select('body').append('svg')
.attr('width',width)
.attr('height',height);

var fill = d3.scale.category20();

function initForce() {

    var force = d3.layout.force()
        .charge(-2000)
        .linkDistance(35)
        .linkStrength(0.25)
        .size([width, height]);

    var links = svg.selectAll('.link')
        .data(dataLinks)
        .enter().append('line')
        .attr('class','link');

    var nodes = svg.selectAll('g')
        .data(dataNodes)
        .enter().append('g')
        .attr('class','node')
    nodes
        .append('circle')
            .attr('r', radius)
            .style('fill', function(d) {
                return d.className == 'class' ? fill(d.group) : 'white';
            })
            .style('stroke', function(d) { return d3.rgb(fill(d.group)).darker(); })
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

    function tick(e) {

        var k = 10 * e.alpha;

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
    };
};