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

const serverRootDir = path.join(os.homedir(), 'framework-server')

module.exports.getFileAbsolutePathWithParameters = function getFileAbsolutePathWithParameters(parameters) {
  let filePath = ''

    const environment = parameters.environment;
    
    if (environment == 'DEVELOPMENT') {
      let fileName = parameters.commitHash + ".framework.zip"
      
      filePath = path.join(serverRootDir, "DEVELOPMENT", parameters.frameworkName, parameters.featureName, fileName)
      
    } else if (environment == "PRODUCTION") {
      let fileName = parameters.frameworkName + ".framework.zip"
      filePath = path.join(serverRootDir, "PRODUCTION", parameters.frameworkName, parameters.version, fileName);
    }

    return filePath;
}

module.exports.serverRootDir = serverRootDir