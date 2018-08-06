const readJson = require('load-json-file');
const writeJson = require('write-json-file');

const writeOpts = {
    indent: 4,
    detectIndent: true
};

function process(filename, process) {
    return new Promise((resolve, reject) => {
        readJson(filename)
            .then(process)
            .then(json => writeJson(filename, json, writeOpts))
            .then(resolve, reject)
            .catch(reject);
    });
}

exports.processJsonFile = process;
