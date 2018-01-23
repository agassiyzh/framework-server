'use strict';

const UploadController = require('./controllers/uploadController');



const Router = require('koa-better-router')
const router = Router().loadMethods()

router.post('/upload', (ctx, next) => {
  let uploadController = new UploadController(ctx);
  uploadController.upload(ctx, next);
})


module.exports = router;
