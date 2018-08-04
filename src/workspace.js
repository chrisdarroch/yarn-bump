const path = require('path');
const {runCommand} = require('./util/child');

class Workspace {
    constructor(dir) {
        this.dir = dir;
    }

    get workspaceData() {
        return runCommand('yarn',
            ['workspaces', 'info', '--silent'],
            { cwd: this.dir }
        ).then(data => JSON.parse(data));
    }

    async packageFilepath(name) {
        const workspace = await this.workspaceData;
        const pkgLoc = workspace[name].location;
        return path.resolve(this.dir, pkgLoc, 'package.json');
    }
}

module.exports = Workspace;
