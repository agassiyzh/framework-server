'use strict';

const UploadController = require('./controllers/uploadController');

let uploadController = new UploadController();

const Router = require('koa-better-router')
const router = Router().loadMethods()

router.post('/upload', uploadController.upload)


module.exports = router;
