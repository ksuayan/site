$(function(){

    $("form").on('change', '.btn-file :file', function() {
        var input = $(this),
            numFiles = input.get(0).files ? input.get(0).files.length : 1,
            label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
        input.trigger('fileselect', [numFiles, label]);
    });

    $('.btn-file :file').on('fileselect', function(event, numFiles, label) {
        var input = $(this).parents('.input-group').find(':text'),
            log = numFiles > 1 ? numFiles + ' files selected' : label;
        if( input.length ) {
            input.val(log);
        } else {
            if( log ) alert(log);
        }
    });


    $("#specimen").on("keyup", function(){
        var text = $("#specimen").val(),
            fScore = gb.util.fleschReadingEase(text),
            fGrade = gb.util.fleschKincaidGradeLevel(text);
        $("#fscore").text(fScore.toFixed(3));
        $("#fgrade").text(fGrade.toFixed(3));
    });

    var searchInput = $("#search-term");
    searchInput.on("mouseup", function(e){
        console.log("mouseup handler", e.type, e.target);
        var wrapper = function() {
            searchInput.select();
        };
        setTimeout(wrapper,1);

    });
});