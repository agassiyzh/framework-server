'use strict';

const Router = require('koa-better-router')
const UploadController = require('./controllers/UploadController');
const GetFrameworkController = require('./controllers/GetFrameworkController');
const DeleteFrameworkController = require('./controllers/DeleteFrameworkController');
const ShowFrameworkController = require('./controllers/ShowFrameworkController');
const router = Router().loadMethods()

router.post('/upload', async (ctx, next) => {
    let uploadController = new UploadController();

    await uploadController.upload(ctx, next);
})

router.get('/download/:frameworkName/:version', async (ctx, next) => {
    let getFrameworkController =  new GetFrameworkController();

    await getFrameworkController.getFramework(ctx, next);
})

router.delete('/framework/:frameworkName/:version', async (ctx, next) => {
    let deleteFrameworkController = new DeleteFrameworkController();
    
    await deleteFrameworkController.deleteFramework(ctx, next);
})

router.get('/framework/:frameworkName', ShowFrameworkController.show)

router.get('/frameworks', ShowFrameworkController.showAllFrameworks)


module.exports = router;
