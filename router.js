'use strict';

const UploadController = require('./controllers/UploadController');
const GetFrameworkController = require('./controllers/GetFrameworkController');
const Router = require('koa-better-router')
const router = Router().loadMethods()

router.post('/upload', (ctx, next) => {
  let uploadController = new UploadController();
  uploadController.upload(ctx, next);
})

router.get('/getframework/PRODUCTION/:frameworkName/:version', async (ctx, next) => {

  let getFrameworkController = new GetFrameworkController();  

  await getFrameworkController.getFramework(ctx, next, 'PRODUCTION');
})

router.get('/getframework/DEVELOPMENT/:frameworkName/:featureName/:commitHash', async (ctx, next) => {
  let getFrameworkController = new GetFrameworkController();

  await getFrameworkController.getFramework(ctx, next, 'DEVELOPMENT')
})

module.exports = router;
