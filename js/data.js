function Data(json) {
    let _col = 1;
    
    this.originalJsonString = json;
    
    this.original = function() {
        return JSON.parse(this.originalJsonString);
    };

    this.rootNodes = [];
    
    this.nodes = [];
    
    this.links = [];

    this.defineNodesAndLinks = function() {
        let originalJson = JSON.parse(this.originalJsonString);

        let dd_class = originalJson['Ingest_LDD']['DD_Class'];
        let dd_attribute = originalJson['Ingest_LDD']['DD_Attribute'];

        _classes = dd_class.concat(dd_attribute);

        // // // /// // // //  // // //
        // set class name for each node
        this.nodes = _classes.map(e => {
            let links = e['DD_Association'];
            
            if (links && links.length) {
                e.className = 'class';
            } else {
                e.className = 'attribute';
            }
            
            return e;
        });

        this.nodes.map((e, idx) => {

            if (!e.children) e.children = [];
            let targets = e['DD_Association'];

            if (targets && targets.length) {
                targets.map(target => {

                    let targetLid;

                    try {
                        targetLid = target['local_identifier'][0];
                    } catch (err) {
                        targetLid = target['identifier_reference'][0];
                    }

                    // invalid 
                    if (targetLid == 'XSChoice#') return;

                    // search for lid in this.nodes array
                    let match = this.nodes.find(el => {
                        let _output;
                        try {
                            _output = el['local_identifier'][0] === targetLid;
                        } catch (err) {
                            _output = el['identifier_reference'][0] === targetLid;
                        }
                        return _output;
                    });

                    if (!match) {
                        // create new node
                        // in pds namespace
                        target.className = 'attribute';
                        try {
                            target.name = [target['local_identifier'][0].replace('pds.', '')];
                        } catch (err) {
                            target.name = [target['identifier_reference'][0].replace('pds.', '')];
                        }
                        this.nodes.push(target);
                        // then create a link in this.links array
                        let _targetIdx = this.nodes.length - 1;
                        this.links.push({
                            source: idx,
                            target: _targetIdx
                        });
                    } else {
                        this.links.push({
                            source: idx,
                            target: this.nodes.indexOf(match)
                        });
                    }
                    e.children.push(target);
                })
                
            }
        });

        // // // // // // // // // // //
        // identify and define root nodes
        this.nodes.map((node, idx) => {
            let _match = this.links.find(link => link.target == idx);
            if (!_match) {
                node.rootNode = true;
                node.col = 1;
                this.rootNodes.push(node);
            }
        });
        
        this.sortCols(this.rootNodes);
    };
    
    // // // // // // // // // // // sortCols(rootNodes)
    // set col attribute on each node for use later during positioning
    // recursive function, begin with root nodes
    this.sortCols = function(nodes) {
        let nextCol = [];
        _col++;

        // for each root element, find its child elements
        nodes.map(root => {
            let _children = root['DD_Association'];
            if (_children && _children.length) {
                // check this each child exists as an element in this.nodes
                _children.map(_child => {
                    let found = this.nodes.find(dn => {
                        let dnLid,
                            _childLid;

                        try {
                            dnLid = dn.local_identifier[0];
                        } catch (err) {
                            dnLid = dn.identifier_reference[0];
                        }

                        try {
                            _childLid = _child.local_identifier[0];
                        } catch (err) {
                            _childLid = _child.identifier_reference[0];
                        }

                        // if it exists, set its class
                        // then pass it into array for storage
                        // to be passed into recursive function upon completion of find() method
                        if (dnLid == _childLid) {
                            dn.col = _col;

                            // push node object to array of nodes in this column
                            // perform the same sequence of steps for each node
                            // in the new array
                            nextCol.push(dn);
                        }
                    });
                });
            }
        });

        if (nextCol.length) this.sortCols(nextCol);
    };
    
    this.deleteNode = function(lid) {
        let that = this;
        let node = this.getNode(lid);
        
        console.log(`delete: ${lid}`);
        let parents = this.parents(lid,true);
        console.log(parents);
        // delete node association from each parent
        parents.map((p,idx) => {
            let parentMap = {};
            let dataParent = data.nodes[p];
            let dpChildren = dataParent.children;
            
            console.log(dataParent);
            dpChildren.map((dpChild,childIdx) => {
                let childLid;
                
                try {
                    childLid = dpChild['local_identifier'][0];
                } catch (err) {
                    childLid = dpChild['identifier_reference'][0];
                }
                
                parentMap[childLid] = childIdx;
            });
            
            console.log(parentMap);
            
            let spliceIdx = parentMap[lid];
            console.log(spliceIdx);
            
            dpChildren.splice(spliceIdx,spliceIdx+1);
        });
        
        console.log(this.nodes);
        
        // TODO node has been removed from data.nodes
            // now update the DOM/D3
        
    };
    
    this.parents = function(lid,getIdx) {
        let idx = this.getNode(lid,true);
        let _parents = [];
        
        this.links.map(l => {
            if (l.target == idx) _parents.push(l.source);
        });
        
        if (getIdx) {
            return _parents;
        } else {
            _parents = _parents.map(p => {
                return data.nodes[p];
            });
            
            return _parents;
        }
        
    };
    
    this.getNode = function(lid,getIdx) {
        let nodeIdx;
        let node;
        
        this.nodes.map((d,idx) => {
            let dLid;
            
            try {
                dLid = d['local_identifier'][0];
            } catch (err) {
                dLid = d['identifier_reference'][0];
            }
            
            if (lid == dLid) {
                nodeIdx = idx;
                node = d;
            }
        });
        
        if (getIdx) return nodeIdx;
        else return node;
    };
    
    // this.nodeByLid
};