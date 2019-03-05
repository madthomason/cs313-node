var fs = require('fs');


var filename = process.argv[2];

function callback(err, results) {
    if (err) {
        console.log(err);
    } else {
        var string = results.toString();
        console.log(string.split('\n').length - 1);
    }
}

fs.readFile(filename, callback);


