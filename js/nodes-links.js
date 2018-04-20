var nodes = null,
    links = null,
    rootNodes = [],
    dataNodes = [],
    dataLinks = [],
    lidType;
    
function initNodesAndLinks() {
    // remove old data
    
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
        
        if (!e.children) e.children = [];
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
            
            // invalid 
            if (targetLid == 'XSChoice#') return;

            // search for lid in dataNodes array
            let match = dataNodes.find(el => {
                let _output;
                try {
                    _output = el['local_identifier'][0] === targetLid;
                } catch (e) {
                    _output = el['identifier_reference'][0] === targetLid;
                }
                return _output;
            });
            
            if (!match) {
                // create new node
                    // in pds namespace
                target.className = 'attribute';
                try {
                    target.name = [target['local_identifier'][0].replace('pds.','')];
                } catch (err) {
                    target.name = [target['identifier_reference'][0].replace('pds.','')];
                }
                dataNodes.push(target);
                // then create a link in dataLinks array
                let _targetIdx = dataNodes.length - 1;
                dataLinks.push({ source: idx, target: _targetIdx });
            } else {
                dataLinks.push({ source: idx, target: dataNodes.indexOf(match) });
            }
            e.children.push(targetLid);
        });
    });
    
    setRootNodes();
    sortCols(rootNodes);
    drawGrid();
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

// set col attribute on each node for use later during positioning
// recursive function, begin with root nodes
function sortCols(_nodes) {
    let nextCol = [];
    _col++;

    // for each root element, find its child elements
    _nodes.map(root => {
        let _children = root['DD_Association'];

        if (_children && _children.length) {
            // check that each child exists as an element in dataNodes
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
                            _lid = dn['local_identifier'][0];
                        } catch (e) {
                            _lid = dn['identifier_reference'][0];
                        }

                        let _localNode = getNodeByLid(_lid);
                        _localNode.col = _col;

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

    if (nextCol.length) sortCols(nextCol);
};