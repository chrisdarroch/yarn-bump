const child = require('child_process');

function runCommand(name, args, opts) {
    let result = '';
    function concat(data) {
        result += data;
    }

    return new Promise((resolve, reject) => {
        const done = (err) => err ? reject(err) : resolve(result.trim());
        const proc = child.spawn(name, args, opts);
        proc.on('error', done);
        if (proc.stderr) {
            proc.stderr.on('data', concat);
        }
        if (proc.stdout) {
            proc.stdout.on('data', concat);
        }
        proc.on('close', (code, signal) => {
            let err = false;
            if (signal || code > 0) {
                err = new Error(`process failed with code ${code} and signal ${signal}`);
            }
            done(err);
        });
    });
}

exports.runCommand = runCommand;
