const util = require('util')
const DatabaseUtils = require('../utils/DatabaseUtil')

module.exports = {

    async show(ctx) {
        let params = ctx.params

        console.log(params)

        const result = await DatabaseUtils.queryDB(params)
            .catch((error) => {
                console.log(error)
            })
        
        if (!result.length) {
            ctx.status = 404
            ctx.body = {
                message: util.format("未找到%s的二进制文件信息", params.frameworkName)
            }
        } else {
            ctx.body = {
                name: params.frameworkName,
                versions: result.map((f) => {
                    return f.version
                })
            }
        }
    },

    async showAllFrameworks(ctx, next) {

        console.log(ctx.query)

        if (ctx.query.allinfo == 'true') {
            let result = await DatabaseUtils.queryDB({}, ['version', 'frameworkName', 'changelog'], false);

            var frameworkMap = {}

            result.forEach(item => {
                let frameworkName = item.frameworkName

                let newItem = `[${item.version}]  - ${item.changelog}`

                if (frameworkMap[frameworkName] == undefined) {
                    frameworkMap[frameworkName] = [ newItem ]
                }else {
                    frameworkMap[frameworkName].push(newItem)
                }
            });

            ctx.body = frameworkMap
        }else  {
            let result = await DatabaseUtils.queryDB(undefined, ['frameworkName'], true);
    
            ctx.body = result.map((f) => {
                return f.frameworkName
            })

        }


        next();
    }
}