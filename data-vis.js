var width = 1500,
    height = 700,
    radius = 20;

var fill = d3.scale.category20();

var force = d3.layout.force()
    .charge(-1000)
    .linkDistance(300)
    .linkStrength(1)
    .size([width, height]);

var svg = d3.select('body').append('svg')
    .attr('width',width)
    .attr('height',height);

var links = svg.selectAll('.link')
    .data(dataLinks)
    .enter().append('line')
    .attr('class','link');

var nodes = svg.selectAll('.node')
    .data(dataNodes)
    .enter().append('circle')
        .attr('class','node')
        .attr('r', radius - 0.75)
        .style('fill', function(d) { return fill(d.group); })
        .style('stroke', function(d) { return d3.rgb(fill(d.group)).darker(); })
        .call(force.drag)
nodes
    .append('text')
    .attr('x',function(d) { return d.x; })
    .attr('y',function(d) { return d.y; })
    .text(function(d) { return d.name[0]; })

force
    .nodes(dataNodes)
    .links(dataLinks)
    .on('tick', tick)
    .start();

function tick(e) {

    var k = 10 * e.alpha;

    links
        .each(function(d,idx) {
            d.source.x -= 3*k;
            d.target.x += 3*k; 
        })
        .attr('x1', function(d) { return d.source.x; })
        .attr('y1', function(d) { return d.source.y; })
        .attr('x2', function(d) { return d.target.x; })
        .attr('y2', function(d) { return d.target.y; })

    nodes
        .attr('cx', function(d) { return d.x; })
        .attr('cy', function(d) { return d.y; });

};