var fs = require('fs');


var filename = process.argv[2];

var results = fs.readFileSync(filename).toString();

console.log(results.split('\n').length - 1);
