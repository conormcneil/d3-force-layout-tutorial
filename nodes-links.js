var nodes = null,
    links = null;
    
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

dataNodes.map((e,idx) => {
    
    let targets = e['DD_Association'];

    if (targets && targets.length) targets.map(target => {
        let targetLid = target['local_identifier'][0];

        // search for lid in dataNodes array
        let match = dataNodes.find(el => el['local_identifier'][0] === targetLid );
        if (match) {
            if (!e.children) e.children = [];
            e.children.push(targetLid);
            dataLinks.push({ source: idx, target: dataNodes.indexOf(match) });
        }
    });
    
});

console.log(dataNodes);