#!/usr/bin/env node

const {bumpVersion} = require('../src/index');

const argv = require('yargs')
    .version(false)
    // todo: assume we're executing in the directory of the package to bump?
    .describe('package', 'package name to bump the version of')
    // todo: semver stuff; all the things yarn normally lets you do?
    .describe('new-version', 'complete version to give the package')
    .alias('v', 'new-version')
    // todo: discover this based on the execution location?
    .describe('dir', 'yarn workspace directory where the package can be found')
    .demandOption(['package', 'new-version', 'dir'])
    .argv;

bumpVersion(argv.package, argv.newVersion, argv.dir);
