'use strict';

const fs = require('fs')
const mkdirp = require('mkdirp');
const os = require('os');
const path = require("path");




module.exports.createFolderIfNeeded = async function createFolderIfNeeded(path) {
  if(!fs.existsSync(path)) {
    mkdirp.sync(path);
  }
}


module.exports.serverRootDir = path.join(os.homedir(), 'framework-server')