var fs = require('fs');
var path = require('path');


var directory = process.argv[2];
var filterBy = '.' + process.argv[3];

function filterEx(err, list) {
    if (err) {
        console.error(err);
    } else {
        list.forEach(file => {
            if (path.extname(file) === filterBy) {
                console.log(file);
            }
        });
    }
}

fs.readdir(directory, filterEx);


