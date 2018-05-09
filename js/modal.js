var modal = null;
var newNode = {};

function newModal(event) {
    let lid;
    
    try {
        lid = event['local_identifier'][0];
    } catch (err) {
        lid = event['identifier_reference'][0];
    }
    
    modal = new Custombox.modal({
        content: {
            effect: 'slide',
            id: 'modalbox',
            target: '#modal',
            onOpen: newModal
        }
    });
    
    modal.open();
    
    function newModal() {
        // refresh modal
        clearModal();
        
        let children = event['DD_Association'];
        
        $('#modal').append('<i class="far fa-3x fa-times-circle modal-close" onclick="closeModal()"></i>');
        $('#modal').append('<i class="fas fa-3x fa-plus-circle create-node" onclick="createNode()"></i>');
        
        $('#modalTitle').text(event['local_identifier'][0]);
        $('#modalBody').append(`<h3>Child Nodes (${children.length}):</h3>`)
        
        children.map(a => {
            $('#modalBody').append(newModalChild(a));
        });
        
        // add event listeners to trash icons now that they exist in DOM
        $('.fa-trash-alt').on('click',function(event) {
            let target = event.target;
            let _confirm = confirm('Are you sure you want to delete this node?');

            if (_confirm) {
                let deleteLid = $(target).parent().attr('class').split(' ')[1].trim().replace('-','.');
                data.deleteNode(deleteLid);
                closeModal();
            } else {
                return;
            }
        });
    };
    
    function clearModal() {
        $('#modalBody').empty();
    };
    
    function newModalChild(node) {
        let childLid,
            htmlChildLid;
        let keys = ['reference_type','minimum_occurrences','maximum_occurrences'];

        try {
            childLid = node['local_identifier'][0];
            keys.unshift('local_identifier');
        } catch (err) {
            childLid = node['identifier_reference'][0];
            keys.unshift('identifier_reference');
        }
        
        htmlChildLid = childLid.replace('.','-');

        let childTitle = `<h3 id="childTitle">${childLid}</h3>`;

        let reference_type = node['reference_type'];
        let minOcc = node['minimum_occurrences'];
        let maxOcc = node['maximum_occurrences'];

        let values = '<div class="childKeys">' +
             `<span class="childKey">${keys[0]}: <input type="text" id="${childLid}" name="${childLid}" value="${childLid}"></span>` + 
             `<span class="childKey">${keys[1]}: <select id="${reference_type}" name="${reference_type}">
                <option value="component_of">component_of</option>
                <option value="attribute_of">attribute_of</option>
             </select></span>` + 
             `<span class="childKey">${keys[2]}: <input type="text" id="${minOcc}" name="${minOcc}" value="${minOcc}"></span>` + 
             `<span class="childKey">${keys[3]}: <input type="text" id="${maxOcc}" name="${maxOcc}" value="${maxOcc}"></span>` + 
        '</div>';
        
        let childButtons = `<div class="modal-child-buttons ${htmlChildLid}"><i class="fas fa-lg fa-trash-alt"></i></div>`;

        return `<form name="${childLid}-form" class="modalChild">${childTitle}${values}${childButtons}</form>`;
    };
};

function createNode() {
    // close any open modals
    closeModal();
    
    // reset newNode
    newNode = {};
    
    let newNodeModal = new Custombox.modal({
        content: {
            effect: 'slide',
            id: 'addnode',
            target: '#create-node',
            onOpen: createNodeModal
        }
    });
    
    newNodeModal.open();
};

function createNodeModal() {
    $('#create-node').empty();
    
    $('#create-node').load('partials/create.1.html',addListeners);
};

function next() {
    // TODO form validation
    
    let i_r = document.getElementById('identifier_reference').value;
    let r_t = document.getElementById('reference_type').value;
    let min = document.getElementById('minimum_occurrences').value;
    let max = document.getElementById('maximum_occurrences').value;
    
    newNode.identifier_reference = i_r;
    newNode.reference_type = r_t;
    newNode.minimum_occurrences = min;
    newNode.maximum_occurrences = max;
    
    $('#create-node').empty();
    
    $('#create-node').load('partials/create.2.html',addListeners);
};

function saveNode() {
    let name = document.getElementById('name').value;
    let v_id = document.getElementById('version_id').value;
    let s_n = document.getElementById('submitter_name').value;
    let def = document.getElementById('definition').value;
    
    newNode.name = name;
    newNode.version_id = v_id;
    newNode.submitter_name = s_n;
    newNode.definition = def;
    
    // metadata has been collected from user:
    // update model and d3
    data.addNode(newNode);
    
    // close modal
    closeModal();
};

function addListeners() {
    $('#cancel').on('click', closeModal);

    $('#next').on('click', next);

    $('#save').on('click', saveNode);
};

function closeModal() {
    Custombox.modal.close();
};