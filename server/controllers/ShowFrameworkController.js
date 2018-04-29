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
    }
}