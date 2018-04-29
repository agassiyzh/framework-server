'use strict';

const path = require('path');
const DatabaseUtil = require("../utils/DatabaseUtil");
const fs = require('fs');
const getFileAbsolutePathWithParameters = require('../utils/FileUtils').getFileAbsolutePathWithParameters;
const createFolderIfNeeded = require('../utils/FileUtils').createFolderIfNeeded;

const ZIP_FILE = require('is-zip-file');

module.exports = class UploadController {

  checkParameters(params) {


    let result = {
      isValid: true,
      message: ""
    };

    const environment = params.environment;

    let neededParams = ['frameworkName', "version", 'changelog'];

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

  saveFiles(file, filePath) {

    const dirName = path.dirname(filePath);

    createFolderIfNeeded(dirName);

    const reader = fs.createReadStream(file.path);
    const writeStream = fs.createWriteStream(filePath);
    reader.pipe(writeStream);
  }

  async upload(ctx, next) {

    ctx.body = "We have received the framework.Thx ^_^!"

    const parametersCheckResult = this.checkParameters(ctx.request.body.fields);

    const fileCheckResult = this.checkFiles(ctx.request.body.files);

    if (parametersCheckResult.isValid && fileCheckResult.isValid) {

      
      const row = await DatabaseUtil.queryDB(ctx.request.body.fields)
      .catch((error) => {
        console.log(error);
      });;
      
      if (row != undefined && row.length > 0) {
        
        console.log("this framework has uploaded");

        ctx.status = 200;
        
        ctx.body = "this framework has uploaded";

        next()

        return;
      }

      const result = await DatabaseUtil.insertDB(ctx.request.body.fields)
        .catch((error) => {
          console.log(error);
        });

      if (result) {
        const path = getFileAbsolutePathWithParameters(ctx.request.body.fields);

        this.saveFiles(ctx.request.body.files.framework, path);
      }


    } else {
      ctx.body = parametersCheckResult.message + '\n' + fileCheckResult.message;
    }    

    next()
  }
}