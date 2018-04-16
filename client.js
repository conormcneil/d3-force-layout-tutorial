$( document ).ready(function() {
    console.log( "ready!" );
    $('button').on('click',getJson);
    
    function getJson(e) {
        let id = e.target.id;
        console.log(e.target.id);
        $.ajax({
            type: "POST",
            url: 'http://localhost:3000/',
            data: {
                id: id
            },
            success: function(res) {
                console.log(res);
            }
        });
    }
});
