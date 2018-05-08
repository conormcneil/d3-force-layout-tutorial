var modal = null;

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
        $('#modal').append('<i class="fas fa-3x fa-plus-circle add-node" onclick="addNode()"></i>');
        
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

function addNode() {
    // close any open modals
    closeModal();
    
    let newNodeModal = new Custombox.modal({
        content: {
            effect: 'slide',
            id: 'addnode',
            target: '#add-node',
            onOpen: addNodeModal
        }
    });
    
    newNodeModal.open();
};

function addNodeModal() {
    $('#add-node').empty();
    
    $('#add-node').append('<i class="far fa-3x fa-times-circle modal-close" onclick="closeModal()"></i>');
    
    $('#add-node').append(`<h2>Add New Node</h2>`);
    
    $('#add-node').append(`<form id="add-new-node" name="add-new-node"></form>`);
    
    $('#add-new-node').append(`<label for="identifier_reference">identifier_reference</label><input type="text" name="identifier_reference" id="identifier_reference">`);
    $('#add-new-node').append(`<label for="reference_type">reference_type</label><select name="reference_type" id="reference_type"><option value="component_of">component_of</option><option value="attribute_of">attribute_of</option></select>`);
    $('#add-new-node').append(`<label for="identifier_reference">identifier_reference</label><input type="text" name="identifier_reference" id="identifier_reference">`);
    $('#add-new-node').append(`<label for="identifier_reference">identifier_reference</label><input type="text" name="identifier_reference" id="identifier_reference">`);
    
    $('#add-node').append('<button id="cancel">Cancel</button>');
    $('#add-node').append('<button id="save">Save</button>');
}

function closeModal() {
    Custombox.modal.close();
};