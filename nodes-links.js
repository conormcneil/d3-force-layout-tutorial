var nodes = null,
    links = null,
    width = 800,
    height = 800;
    
var dataNodes = _classes.map(e => {
    let links = e['DD_Association'];
    
    if (links && links.length) {
        e.className = 'class';
    } else {
        e.className = 'attribute';
    }
    
    return e;
    
});

var dataLinks = [];

_classes.map((e,idx) => {
    
    let links = e['DD_Association'];

    if (links && links.length) links.map(i => {
        let lid = i['local_identifier'][0];

        // search for lid in dataNodes array
        let match = dataNodes.find(el => el['local_identifier'][0] === lid );
        if (match) dataLinks.push({ source: idx, target: dataNodes.indexOf(match) });
    });
    
});