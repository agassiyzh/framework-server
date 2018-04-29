'use strict';

const fs = require('fs')
const mkdirp = require('mkdirp');
const os = require('os');
const path = require("path");




module.exports.createFolderIfNeeded = function createFolderIfNeeded(path) {
  if(!fs.existsSync(path)) {
    mkdirp.sync(path);
  }
}

const serverRootDir = (process.env.NODE_ENV == 'production')? path.join("/data", 'framework-server') : path.join(os.homedir(), 'framework-server')

module.exports.getFileAbsolutePathWithParameters = function getFileAbsolutePathWithParameters(parameters) {
  let filePath = ''

    let fileName = parameters.frameworkName + ".framework.zip"
    filePath = path.join(serverRootDir, "Frameworks", parameters.frameworkName, parameters.version, fileName);

    return filePath;
}

module.exports.serverRootDir = serverRootDir