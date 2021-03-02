const fs = require('fs');

const read = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data)  => {
            if (err) {
              reject(err);
            }
            resolve(data);
        });
    });
}

const save = (path, content) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, content, function(err) {
            if(err) {
                reject(err);
            }
            resolve();
        });    
    });
}

exports.save  = save;
exports.read  = read;
