var fs = require('fs');
var path = require('path');

module.exports = function (directory, extension, callback) {
    fs.readdir(directory, function filterEx(err, list) {
        if (err) {
            return callback(err);
        } else {
            var filteredList = [];
            list.forEach(file => {
                if (path.extname(file) === '.' + extension) {
                    filteredList.push(file);
                }
            });
            return callback(null, filteredList);
        }
    });
};





