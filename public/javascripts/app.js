$(function(){



    console.log("hello Epsilon");
    var $results = $(".results");

    var availableImageNumber = 0;
    var pictureArray = [];


    //////////////////////////////////////////////////////////////////////
    //Pass the image number to an ajax read of the image location file, //
    //and receive back the path to the image. Append the image onto the //
    //DOM's "results" class div.                                        //
    //////////////////////////////////////////////////////////////////////

    var getImage = function (i, location) {
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: '/' + i,
            complete: function(){
            },success: function(data){
                console.log('AJAX complete');
                console.log(data);
                $(".results").append("<img class='pic' data-location='" + location + "' data-id='" + i + "'style='width:300px' src=" + data + ">");
            },
            error: function(request, errorType, errorMessage){
                console.log(errorType + errorMessage);
            }
        })};

    //////////////////////////////////////////////////////////////////
    // Create an array of image numbers, shuffle those numbers,     //
    // then loop over the first 5 calling getImage to display them. //
    //////////////////////////////////////////////////////////////////

    var showPictures = function() {
        var pictureArray = [0, 1, 2, 3, 4, 5];
        var i = 0;

        shuffle(pictureArray);
        while (i < 5) {
            getImage(pictureArray[i], i);
            i++;
            availableImageNumber = pictureArray[5];
            console.log("availableImageNumber: ",availableImageNumber);
        }
    };


    ///////////////////////////////////////////////////////////
    // Shuffle the elements of an array and return the array //
    ///////////////////////////////////////////////////////////

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


    ///////////////////////////////////////////////////////
    // On start  up, display initial 5 of the 6 pictures //
    ///////////////////////////////////////////////////////

    showPictures();


    ///////////////////////////////////////////////////
    // When Shuffle Pictures button is clicked,      //
    // clear the DOM's appended images, shuffle      //
    // the array and display the the first 5 images. //
    ///////////////////////////////////////////////////

    $('#shufflePictures').on('click', function() {
        console.log("saw a shuffle click");
        $(".results").empty();
        showPictures();
    });

    //////////////////////////////////////////////////////
    // Click image to get new image.                    //
    // Replace image data and src with those for the    //
    // image on the bench, then update the bench image. //
    //////////////////////////////////////////////////////

    $(document).on("click", ".pic", function() {
        console.log("Saw a replace click");
        currentImage = parseInt(($(this).attr('data-id')));
        var thing = $(this);  //thing = image to be replaced
        var ii = availableImageNumber; // is the image to replace it
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: '/' + ii,
            complete: function(){
            },success: function(data){
                thing.attr("data-id", ii);  //replace the image's data
                thing.attr("src", data);    //replace the src with the src to the new image
            },
            error: function(request, errorType, errorMessage){
                console.log(errorType + errorMessage);
            }
        });
        availableImageNumber = currentImage;
    });

});
