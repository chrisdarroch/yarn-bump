const readJson = require('load-json-file');
const writeJson = require('write-json-file');

function process(filename, process) {
    return new Promise((resolve, reject) => {
        readJson(filename)
            .then(process)
            .then(json => writeJson(filename, json))
            .then(resolve, reject)
            .catch(reject);
    });
}

exports.processJsonFile = process;
