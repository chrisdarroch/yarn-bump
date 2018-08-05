const path = require('path');
const WorkspaceSnapshot = require('./workspace-snapshot');
const {runCommand} = require('./util/child');

class Workspace {
    constructor(dir) {
        this.dir = dir;
    }

    get workspaceSnapshot() {
        return runCommand('yarn',
            ['workspaces', 'info', '--silent'],
            { cwd: this.root }
        )
        .then(data => JSON.parse(data))
        .then(json => new WorkspaceSnapshot(this, json));
    }

    get root() {
        return this.dir;
    }
}

module.exports = Workspace;
