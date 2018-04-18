var nodes = null,
    links = null,
    rootNodes = [],
    dataNodes = [],
    dataLinks = [],
    lidType;
    
function initNodesAndLinks() {
    // remove old data
    svg.selectAll('*').remove();
    
    dataNodes = _classes.map(e => {
        let links = e['DD_Association'];
        
        if (links && links.length) {
            e.className = 'class';
        } else {
            e.className = 'attribute';
        }
        
        return e;
        
    });

    dataLinks = [];

    dataNodes.map((e,idx) => {
        
        let targets = e['DD_Association'];

        if (targets && targets.length) targets.map(target => {
            
            let targetLid;
            lidType = 'local_identifier';
            
            try {
                targetLid = target[lidType][0];
            } catch (e) {
                lidType = 'identifier_reference';
                targetLid = target[lidType][0];
            }

            // search for lid in dataNodes array
            let match = dataNodes.find(el => el['local_identifier'][0] === targetLid );
            
            if (!match) {
                // create new node
                    // in pds namespace
                target.className = 'attribute';
                target.name = [target['local_identifier'][0].replace('pds.','')];
                dataNodes.push(target);
                // then create a link in dataLinks array
                let _targetIdx = dataNodes.length - 1;
                dataLinks.push({ source: idx, target: _targetIdx });
            } else {
                if (!e.children) e.children = [];
                e.children.push(targetLid);
                dataLinks.push({ source: idx, target: dataNodes.indexOf(match) });
            }
        });
    });
    
    setRootNodes();
    initForce();
};

function setRootNodes() {
    dataNodes.map((node,idx) => {
        let _match = dataLinks.find(link => link.target == idx);
        if (!_match) {
            node.rootNode = true;
            rootNodes.push(node);
        };
    });
};
