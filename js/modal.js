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
            } else {
                return;
            }
        });
    };
    
    function clearModal() {
        $('#modalBody').empty();
    };
    
    function newModalChild(node) {
        console.log(node);
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

function closeModal() {
    Custombox.modal.close();
};