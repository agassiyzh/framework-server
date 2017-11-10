const Koa = require("koa");
const app = new Koa();
const koaBody = require('koa-body');
const fs = require('fs')
const os = require('os')
const path = require('path');
const logger = require('koa-logger');
const sqlite3 = require('sqlite3');
const mkdirp = require('mkdirp');

const typEnum = {
  "production": 0,
  "development": 1
};


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

  if ( !(type in typEnum) ) {
    this.body = "type error";
    yield next

    return;
  }


  const files = this.request.body.files;

  const framework = files.framework;

  const reader = fs.createReadStream(framework.path);

  const thisFrameworkDir = path.join(serverDir, name, version);

  console.log(thisFrameworkDir);

  createFolderIfNeeded(thisFrameworkDir);

  const stream = fs.createWriteStream(path.join(thisFrameworkDir, name + ".framework.zip"));
  reader.pipe(stream);

  this.body = 'done'

  yield next
})

app.use(router.middleware())

app.listen(3000);
