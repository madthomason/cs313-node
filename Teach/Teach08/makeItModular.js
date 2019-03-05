var dirFilterModule = require('./filterDirModule.js');

var directory = process.argv[2];
var filterBy = process.argv[3];

function display(err, filteredList) {
    filteredList.forEach(file => {
        console.log(file);
    });
}

dirFilterModule(directory, filterBy, display);
