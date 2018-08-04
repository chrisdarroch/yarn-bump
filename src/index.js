const readJson = require('load-json-file');
const writeJson = require('write-json-file');
const Workspace = require('./workspace');

const DEPENDENCY_TYPES = [
    'dependencies',
    'devDependencies',
    'peerDependencies',
    'optionalDependencies'
];

function processJsonFile(filename, process) {
    return new Promise((resolve, reject) => {
        readJson(filename)
            .then(process)
            .then(json => writeJson(filename, json))
            .then(resolve, reject)
            .catch(reject);
    });
}

function replaceVersion(depName, newVersion, json) {
    for (type of DEPENDENCY_TYPES) {
        if (!json[type] || !json[type][depName]) continue;
        console.log('replacing', depName, json[type][depName]);
        json[type][depName] = newVersion;
    }
    return json;
}

async function bumpVersion(depName, newVersion, dir) {
    const workspace = new Workspace(dir);
    const workspaceStart = await workspace.workspaceData;
    console.log(workspaceStart);

    // Find the dependent packages
    const dependents = Object.keys(workspaceStart).filter(key => {
        const deps = workspaceStart[key]['workspaceDependencies'];
        return deps.indexOf(depName) > -1;
    });

    const depPkg = await workspace.packageFilepath(depName);
    // Bump the version of the package itself.
    processJsonFile(depPkg, pkg => {
        pkg.version = newVersion;
        return pkg;
    });

    // Bump the dependent versions
    for (secondName of dependents) {
        const secondPkg = await workspace.packageFilepath(secondName);
        await processJsonFile(
            secondPkg,
            json => replaceVersion(depName, newVersion, json)
        );
    }

    const workspaceEnd = await workspace.workspaceData;
    console.log(workspaceEnd);
}

exports.bumpVersion = bumpVersion;
