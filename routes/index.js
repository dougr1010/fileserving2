var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var jsonquery = require('json-query');


var fileLocation = path.join(__dirname, '../model/data.json');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, "../views/index.html"))
});


/* Get the image path when passed the image id */
router.get('/:id?', function(req, res, next){
        var id = req.params.id;
        if (id != "favicon.ico") {
        fs.readFile(fileLocation, function (err, data) {
            var obj = JSON.parse(data);
            var query = getJsonQueryString('id', id);
            if (id) {
                var picture = jsonquery(query, {data: obj});
                res.json(obj[id].link);
            } else {
                res.json(obj);
            }
        })
    }
});

function getJsonQueryString(key, value){
    var queryString = '[' + key + '=' + value + ']';
    return queryString;
}


module.exports = router;
