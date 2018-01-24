'use strict';
const Koa = require("koa");
const app = new Koa();
const koaBody = require('koa-body');
const logger = require('koa-logger');
const sqlite3 = require('sqlite3');
const Enum = require('enum');
const os = require('os')
const path = require('path');
const serverRootDir = require('./utils/FileUtils.js').serverRootDir;

const createFolderIfNeeded = require('./utils/FileUtils.js').createFolderIfNeeded;

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

function excuteDB(cmd, params, callback) {
  var db = new sqlite3.Database(serverRootDir + '/db.sqlite3');
  db.run(cmd, params, callback);

  db.close();
}

excuteDB("CREATE TABLE IF NOT EXISTS info ( \
  id integer PRIMARY KEY autoincrement,\
  version TEXT,\
  frameworkName TEXT,\
  featureName TEXT,\
  changelog TEXT,\
  environment integer,\
  commitHash TEXT \
)");



app.use(koaBody({ multipart: true}));


app.use(router.middleware())

app.listen(3000);
