# FileServingExample

This is an exercise that uses a HTML, CSS, jQuery, and a Node server to display in random order a collection of pictures, whose image files are stored on the server, as is another file containing the path to the images.  

On startup, an array of six picture ID numbers is randomized, the paths to the first five of them are read from the file, and these five images are appended to the DOM. A button is provided that repeats the process when clicked.  When when any picture is clicked on, that picture is replaced with the unused picture by replacing the image's property values with those of the unused picture.
