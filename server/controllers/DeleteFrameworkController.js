const path = require('path');
const DatabaseUtils = require('../utils/DatabaseUtil');
const getFileAbsolutePathWithParameters = require("../utils/FileUtils").getFileAbsolutePathWithParameters;
const fs = require('fs');


module.exports = class DeleteFrameworkController {
    async deleteFramework(ctx, next, env) {
        let parameters = ctx.params;
        parameters.environment = env;

        var responseObject = {
            code: 1,
            message: ""
        }

        const row = await DatabaseUtils.queryDB(parameters)
            .catch((error) => {
                console.log(error);
            });

        const result = await DatabaseUtils.deleteFramework(parameters)
            .catch((error) => {
                console.log(error);
            });

        responseObject.code = row? 1 : 0;

        if (!row) {
            responseObject.message = "This framework version is not exists!";
        }

        const filePath = getFileAbsolutePathWithParameters(parameters);

        

        if (fs.existsSync(filePath)) {
            console.log(filePath)
            fs.unlinkSync(filePath)
        }

        ctx.body = responseObject;
        
    }
};