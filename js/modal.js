function newModal(event) {
    let lid;
    
    try {
        lid = event['local_identifier'][0];
    } catch (err) {
        lid = event['identifier_reference'][0];
    }
    
    let element = data.nodeInfo(lid);
    
    var modal = new Custombox.modal({
        content: {
            effect: 'slide',
            target: '#modal',
            onOpen: function() {
                // refresh modal
                clearModal();
                
                let children = event['DD_Association'];
                
                $('#modalTitle').text('Selected Node: ' + event['local_identifier'][0]);
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
        let childLid = node['local_identifier'][0];
        let childTitle = `<h3 class="childTitle">${childLid}</h3>`;
        
        let keys = ['local_identifier','reference_type','minimum_occurrences','maximum_occurrences'];
        
        let values = '<div class="childKeys">' +
             `<span class="childKey">${keys[0]}: <input type="text" id="${node[keys[0]]}" name="${node[keys[0]]}" value="${node[keys[0]]}"></span>` + 
             `<span class="childKey">${keys[1]}: <input type="text" id="${node[keys[1]]}" name="${node[keys[1]]}" value="${node[keys[1]]}"></span>` + 
             `<span class="childKey">${keys[2]}: <input type="text" id="${node[keys[2]]}" name="${node[keys[2]]}" value="${node[keys[2]]}"></span>` + 
             `<span class="childKey">${keys[3]}: <input type="text" id="${node[keys[3]]}" name="${node[keys[3]]}" value="${node[keys[3]]}"></span>` + 
        '</div>';
        
        return `<div class="modalChild">${childTitle}${values}</div>`;
    };
};