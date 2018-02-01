'use strict';

const path = require('path');
const serverRootDir = require('../utils/FileUtils').serverRootDir;
const DatabaseUtil = require("../utils/DatabaseUtil");

const ZIP_FILE = require('is-zip-file');

module.exports = class uploadController {

  createFolderIfNeeded(path) {

    if (!fs.existsSync(path)) {
      mkdirp.sync(path);
    }
  }

  checkParameters(params) {


    let result = {
      isValid: true,
      message: ""
    };

    const environment = params.environment;

    let neededParams = ['frameworkName'];


    if (environment == 'DEVELOPMENT') {
      neededParams = neededParams.concat(["featureName", 'commitHash']);
    } else if (environment == 'PRODUCTION') {
      neededParams = neededParams.concat(["version", 'changelog']);
    } else {
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

  checkFiles(files) {

    let result = {
      isValid: true,
      message: ""
    };

    try {
      const framework = files.framework;




      if (framework === undefined) {
        result = {
          isValid: false,
          message: "framework file not set"
        }


      }

      const isZip = ZIP_FILE.isZipSync(framework.path);

      if (!isZip) {
        result.isValid = false
        result.message = "the uploaded framework file is not zip"

      }
    } catch (error) {
      console.log(error);
    }

    return result;
  }

  getFileAbsolutePathWithParameters(parameters) {

    let filePath = '';

    const environment = parameters.environment;


    if (environment == 'DEVELOPMENT') {
      let fileName = parameters.commitHash + ".framework.zip"
      filePath = path.join(serverRootDir, "DEVELOPMENT", parameters.frameworkName, parameters.featureName, fileName)
    } else if (environment == "PRODUCTION") {
      let fileName = parameters.frameworkName + ".framework.zip"
      filePath = path.join(serverRootDir, "PRODUCTION", parameters.frameworkName, parameters.version, fileName);
    } else {

    }

    return filePath;

  }

  async saveFiles(file, path) {

  }

  async upload(ctx, next) {

    const parametersCheckResult = this.checkParameters(ctx.request.body.fields);

    const fileCheckResult = this.checkFiles(ctx.request.body.files);

    if (parametersCheckResult.isValid && fileCheckResult.isValid) {
      ctx.body = "OK"

      const row = await DatabaseUtil.queryDB(ctx.request.body.fields)
        .catch((error) => {
          console.log(error);
        });;


      if (row) {
        ctx.body = "this framework has uploaded";

        next();

        return;
      }

      const result = await DatabaseUtil.insertDB(ctx.request.body.fields)
        .catch((error) => {
          console.log(error);
        });
        

    } else {
      ctx.body = parametersCheckResult.message + '\n' + fileCheckResult.message;
    }

    next()
  }
}