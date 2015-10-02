$(function(){



    console.log("hello from client");
    var $results = $(".results");

    var availableImageNumber = 0;
    var pictureArray = [];


    var getImage = function (i, location) {
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: '/' + i,
            complete: function(){
            },success: function(data){
                console.log('AJAX complete');
                console.log(data);
                //$(".results").append("<img class='pic' id='Picture" + i + "' data-id='" + i + "'style='width:300px' src=" + data + "><br />");
                $(".results").append("<img class='pic' data-location='" + location + "' data-id='" + i + "'style='width:300px' src=" + data + ">");
            },
            error: function(request, errorType, errorMessage){
                //alert(errorType + errorMessage);
            }
        })};



    var showPictures = function() {
        var pictureArray = [0, 1, 2, 3, 4, 5];
        var i = 0;

        shuffle(pictureArray);
        while (i < 5) {
            // getImage(i);
            getImage(pictureArray[i], i);
            //console.log(pictureArray[i]);
            i++;
            availableImageNumber = pictureArray[5];
            console.log("availableImageNumber: ",availableImageNumber);
        }
    }




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

    //----------------------------------------------------------------------------

    //Display initial 5 pictures
    showPictures();


    //click the shuffle pictures button
    ///////////////////////////////////
    $('#shufflePictures').on('click', function() {
        console.log("saw a shuffle click")
        $(".results").empty();
        showPictures();
    });


    //click new image button
    ////////////////////////
    $(document).on("click", ".pic", function() {     //document ".pic" works

        //this almost works but appends the new pic to the end of the list
        //console.log("Saw a replace click");
        //currentImage = parseInt(($(this).attr('data-id')));
        //console.log('current image: ', currentImage);
        //$(this).remove();
        //console.log('calling for image index: ',availableImageNumber);
        //getImage(availableImageNumber);
        //availableImageNumber = currentImage;

        //try prepending, then deleting $this
        console.log("Saw a replace click");
        currentImage = parseInt(($(this).attr('data-id')));
        console.log('current image: ', currentImage);
        console.log('calling for image index: ',availableImageNumber);
        console.log("data-location : " + $(this).attr("data-location"));
        var thing = $(this);

        //getImage(availableImageNumber);
        //var getImage = function (i) {
        var ii = availableImageNumber;
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: '/' + ii,
            complete: function(){
            },success: function(data){
                //console.log('AJAX complete');
                //console.log(data);
                //var $imgLoc = $('[data-location=' + $(this).attr("data-location"));
                //console.log("data-location : " + $(this).attr("data-location"));
                //console.log("imgLoc: ", $imgLoc);
                //$(".results").append("<img class='pic' id='Picture" + ii + "' data-id='" + ii + "'style='width:300px' src=" + data + ">");//<br />
                console.log("thing", thing.attr("data-location"));
                thing.attr("src", data);
                //$(".results").append("<img class='pic' id='Picture" + ii + "' data-id='" + ii + "'style='width:300px' src=" + data + ">");//<br />
                //$(".results").append/prepend seems the only thing that works
            },
            error: function(request, errorType, errorMessage){
                //alert(errorType + errorMessage);
            }
        });
        console.log($(this));
        //$(this).remove();
        availableImageNumber = currentImage;


    });


});
