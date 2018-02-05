const getFileAbsolutePathWithParameters = require("../utils/FileUtils").getFileAbsolutePathWithParameters;
const fs = require('fs')

module.exports = class GetFrameworkController {

    fileIsAccessPromise(filePath) {
        return new Promise((resolve, reject) => {
            fs.access(filePath, async (error) => {

                if (error) {
                    reject(error)
                }else {
                    resolve(true)
                }
    
            })
        })
    }

    async getFramework(ctx, next, env) {
        let parameters = ctx.params;
        parameters.environment = env;


        const filePath = getFileAbsolutePathWithParameters(parameters);

        const fileIsExist = await this.fileIsAccessPromise(filePath).catch((error) => {
            console.error(error)
        });


        if (fileIsExist !== true) {
            ctx.body = "file is not found"
        }else {
            ctx.body = fs.createReadStream(filePath);
            ctx.set('Content-Disposition', "attachment; filename=" + ctx.params.frameworkName + '.framework.zip');
        }

        next()
        
    }
}