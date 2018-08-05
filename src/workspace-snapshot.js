const path = require('path');

class WorkspaceSnapshot {
    constructor(workspace, json) {
        this.data = json;
        this.workspace = workspace;
    }

    get packages() {
        return this.data;
    }

    packageFilepath(name) {
        const { data, workspace } = this;
        const pkgLoc = data[name].location;
        return path.resolve(workspace.root, pkgLoc, 'package.json');
    }
}

module.exports = WorkspaceSnapshot;
