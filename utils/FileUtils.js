'use strict';

const fs = require('fs')
const mkdirp = require('mkdirp');


module.exports.createFolderIfNeeded = async function createFolderIfNeeded(path) {
  if(!fs.existsSync(path)) {
    mkdirp.sync(path);
  }
}
