'use strict';




/**
router.post('/upload', function *(next) {
  console.log(this.request.body.fields);

  let fields = this.request.body.fields;

  let result = checkParameters(fields)

  console.log(result);
  console.log(typeof result.result);

  if ( result === true ) {

  }else {
    this.body = 'result'
     yield next
  }

  // console.log(typEnum.get(type.toUpperCase()).value);
  //
  // const files = this.request.body.files;
  //
  // const framework = files.framework;
  //
  // const reader = fs.createReadStream(framework.path);
  //
  // console.log(thisFrameworkDir);
  //
  // createFolderIfNeeded(thisFrameworkDir);
  //
  // const stream = fs.createWriteStream(path.join(thisFrameworkDir, name + ".framework.zip"));
  //
  // reader.pipe(stream);

  this.body = 'done'

  yield next
})

*/

module.exports = class uploadController {


  createFolderIfNeeded(path) {

    if(!fs.existsSync(path)) {
      mkdirp.sync(path);
    }
  }

  checkParameters(params) {

    let result = {
      isValid : true,
      message : ""
    };

    const environment = params.environment;

    let neededParams = ['frameworkName'];


    if (environment == 'DEVELOPMENT') {
      neededParams = neededParams.concat(["featureName", 'commitHash']);
    }else if (environment == 'PRODUCTION') {
      neededParams = neededParams.concat(["version", 'changelog']);
    }else {
      result.isValid = false;

      result.message = 'environment should be DEVELOPMENT/PRODUCTION';

      return result;
    }

    let inValidParams = []

    for (var param in neededParams) {

      if (neededParams.hasOwnProperty(param)) {
        if (!params.hasOwnProperty(neededParams[param])) {
          result.isValid = false;
          inValidParams.push("\"" + neededParams[param] + "\"")
        }
      }
    }

    result.message = inValidParams.join(" , ") + " not set"



    return result;
  }

  async upload(ctx, next) {
    ctx.body = 'call upload function';

    let fields = ctx.request.body.fields;

    const result = this[checkParameters](fields);

    ctx.body = result.message;


    next()
  }
}
