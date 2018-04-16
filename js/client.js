$( document ).ready(function() {
    let id;
    
    let def = 'particle';
    getJson(def);
    
    // user actions
    $('button').on('click',configRequest);
    
    function configRequest(event) {
        id = event.target.id;
        getJson(id);
    };
    
    function getJson(id) {
        $.ajax({
            type: "POST",
            url: 'http://localhost:3000/',
            data: {
                id: id
            },
            success: setClasses
        });
    };
    
    function setClasses(_json) {
        _json = JSON.parse(_json);
        
        let dd_class = _json['Ingest_LDD']['DD_Class'];
        let dd_attribute = _json['Ingest_LDD']['DD_Attribute'];
        
        _classes = dd_class.concat(dd_attribute);

        initNodesAndLinks();
        
        // append ldd name to top of d3 container for reference
        $('#ldd-name').text(id);
    };
});
