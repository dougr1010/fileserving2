/**
 * Created by joelmiller on 9/30/15.
 */
$(function(){
    console.log("hello from client");
    var $results = $("#results");

    var getImage = function (i) {

        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: '/' + i,
            complete: function(){
            },success: function(data){
                //console.log('AJAX complete');
                console.log(data);
                  $("#results").append("<img style='width:300px' src=" + data + "><br />");
                //})
            },
            error: function(request, errorType, errorMessage){
                //alert(errorType + errorMessage);
            }
        })};



    var showPictures = function() {
        var pictureArray = [0, 1, 2, 3, 4, 5];
        var i = 0;

        pictureArray = shuffle(pictureArray);
        while (i < 5) {
            // getImage(i);
            getImage(pictureArray[i]);
            console.log(pictureArray[i]);
            i++;
        }
    }

    $('#shufflePictures').on('click', function() {
        $("#results").empty();
        showPictures();
    });

    showPictures();

    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex ;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

});
