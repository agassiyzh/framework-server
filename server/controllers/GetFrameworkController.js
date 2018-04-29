const getFileAbsolutePathWithParameters = require("../utils/FileUtils").getFileAbsolutePathWithParameters;
const fs = require('fs')

module.exports =  class GetFrameworkController{

    async getFramework(ctx, next) {
        let parameters = ctx.params;

        const filePath = getFileAbsolutePathWithParameters(parameters);

        const fileIsExist = await fs.existsSync(filePath);


        if (fileIsExist !== true) {
            ctx.body = "file is not found"
        }else {
            ctx.body = fs.createReadStream(filePath);
            ctx.set('Content-Disposition', "attachment; filename=" + ctx.params.frameworkName + '.framework.zip');
        }

        next()
        
    }
}