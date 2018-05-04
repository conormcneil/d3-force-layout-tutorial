function Data(json) {
    let _col = 1;
    
    this.originalJsonString = json;
    
    this.original = function() {
        return JSON.parse(this.originalJsonString);
    };
    
    this.model = JSON.parse(json);
    
    this.modelJson = function() {
        return JSON.stringify(this.model);
    };

    this.rootNodes = [];

    this.defineNodesAndLinks = function() {
        
        this.nodes = [];
        
        this.links = [];
        
        let model = this.model;

        let dd_class = model['Ingest_LDD']['DD_Class'];
        let dd_attribute = model['Ingest_LDD']['DD_Attribute'];

        let _classes = dd_class.concat(dd_attribute);

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

            e.children = [];
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
        let nodeType = node.className;
        let deleteIdx;
        let parentClass = nodeType == 'attribute' ? 'DD_Attribute' : 'DD_Class';
        
        // remove node from corresponding parentClass array
        let array = data.model['Ingest_LDD'][parentClass];
        
        array.map((element,idx) => {
            let eLid;
            
            try {
                eLid = element['local_identifier'][0];
            } catch (err) {
                eLid = element['identifier_reference'][0];
            }
            
            if (eLid == lid) deleteIdx = idx;
        });
        array.splice(deleteIdx,1);
        
        // remove any references to node from remaining elements in 'DD_Class'
        let ddClass = data.model['Ingest_LDD']['DD_Class'];
        
        ddClass.map(c => {
            let className = c['local_identifier'][0];
            let associations = c['DD_Association'];
            let associationIdxs = [];
            
            associations.map((a,aIdx) => {
                let aLid;
                
                try {
                    aLid = a['local_identifier'][0];
                } catch (err) {
                    aLid = a['identifier_reference'][0];
                }
                
                if (aLid == lid) {
                    associations.splice(aIdx,1);
                }
            });
            
        });
        
        // node has been removed from data.model
        // update nodes and links
        this.defineNodesAndLinks();
        // now update the DOM/D3
        update();
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
    
    this.defineNodesAndLinks();
};