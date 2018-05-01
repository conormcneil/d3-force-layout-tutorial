function newModal(event) {
    let lid;
    
    try {
        lid = event['local_identifier'][0];
    } catch (err) {
        lid = event['identifier_reference'][0];
    }
    
    var modal = new Custombox.modal({
        content: {
            effect: 'slide',
            target: '#modal',
            onOpen: function() {
                // refresh modal
                clearModal();
                
                let children = event['DD_Association'];
                
                $('#modalTitle').text(event['local_identifier'][0]);
                $('#modalBody').append(`<h3>Child Nodes (${children.length}):</h3>`)
                
                children.map(a => {
                    $('#modalBody').append(newModalChild(a));
                })
            }
        }
    });
    
    modal.open();
    
    function clearModal() {
        $('#modalBody').empty();
    };
    
    function newModalChild(node) {
        let childLid;
        let keys = ['reference_type','minimum_occurrences','maximum_occurrences'];

        try {
            childLid = node['local_identifier'][0];
            keys.unshift('local_identifier');
        } catch (err) {
            childLid = node['identifier_reference'][0];
            keys.unshift('identifier_reference');
        }

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

        return `<form name="${childLid}-form" class="modalChild">${childTitle}${values}</form>`;
    };
};