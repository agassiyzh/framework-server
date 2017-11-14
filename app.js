const Koa = require("koa");
const app = new Koa();
const koaBody = require('koa-body');
const fs = require('fs')
const os = require('os')
const path = require('path');
const logger = require('koa-logger');
const sqlite3 = require('sqlite3');
const mkdirp = require('mkdirp');
const Enum = require('enum');

const typEnum = new Enum( ['PRODUCTION', 'DEVELOPMENT'] );


let Router = require('koa-better-router')
let router = Router().loadMethods()

let serverDir = os.homedir() + '/frameworks/'

createFolderIfNeeded(serverDir);

if (app.env == 'development') {
  console.log("run as development");

  app.use(require('koa-browser-sync')({
    init: true,
    files: ["app.js"]
  }));

  app.use(logger());
}

function createFolderIfNeeded(path) {

  if(!fs.existsSync(path)) {
    mkdirp.sync(path);
  }
}

function excuteDB(cmd, params, callback) {
  var db = new sqlite3.Database(serverDir + 'db.sqlite3');
  db.run(cmd, params, callback);

  db.close();
}

excuteDB("CREATE TABLE IF NOT EXISTS info (\
  id integer PRIMARY KEY autoincrement,\
  version TEXT,\
  name TEXT,\
  changelog TEXT\
)");

app.use(koaBody({ multipart: true}));

router.get('/', (ctx, next) => {
  ctx.body = `Hello, world! Prefix: ${ctx.route.prefix}`

  return next()
});


router.post('/upload', function *(next) {
  console.log(this.request.body.fields);

  let fields = this.request.body.fields;

  const version = fields.version;
  const name = fields.name;
  const changelog = fields.changelog;
  const type = fields.type;
  const featureName = fields.featureName;

  // if ( !typEnum.isDefined(type.toUpperCase()) ) {
  //   this.body = "type error";
  //   yield next
  //
  //   return;
  // }

  let thisFrameworkDir = "";

  if (type.toUpperCase() == 'PRODUCTION') {
    if (version == undefined) {
      this.body = "no version";

      yield next;

      return;
    }

    thisFrameworkDir = path.join(serverDir, "PRODUCTION", name, version);

  }else if (type.toUpperCase() == 'DEVELOPMENT') {

    if (featureName == undefined) {
      this.body = "no featureName";

      yield next;

      return;
    }

    thisFrameworkDir = path.join(serverDir, "DEVELOPMENT", name, featureName);
  }else {
    this.body = "type error";
    yield next

    return;
  }

  console.log(typEnum.get(type.toUpperCase()).value);

  const files = this.request.body.files;

  const framework = files.framework;

  const reader = fs.createReadStream(framework.path);

  console.log(thisFrameworkDir);

  createFolderIfNeeded(thisFrameworkDir);

  const stream = fs.createWriteStream(path.join(thisFrameworkDir, name + ".framework.zip"));

  reader.pipe(stream);

  this.body = 'done'

  yield next
})

app.use(router.middleware())

app.listen(3000);
