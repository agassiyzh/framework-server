'use strict';
const Koa = require("koa");
const app = new Koa();
const koaBody = require('koa-body');
const logger = require('koa-logger');
const Enum = require('enum');
const os = require('os')
const path = require('path');
const serverRootDir = require('./utils/FileUtils.js').serverRootDir;
const createFolderIfNeeded = require('./utils/FileUtils.js').createFolderIfNeeded;
const DatabaseUtils = require('./utils/DatabaseUtil');
const typEnum = new Enum( ['PRODUCTION', 'DEVELOPMENT'] );



let router = require('./router.js')

createFolderIfNeeded(serverRootDir);

if (app.env == 'development') {
  console.log("run as development");

  app.use(require('koa-browser-sync')({
    init: true,
    files: ["./**/*", 'router.js']
  }));

  app.use(logger());
}

DatabaseUtils.createDatabase();

app.use(koaBody({ multipart: true}));


app.use(router.middleware())

app.listen(3000);
