const YAML = require('yamljs');
const isJSON = require('koa-is-json');

const hasOwnProperty = Object.hasOwnProperty

module.exports = function (opts = {}) {
    const param = opts.param
    const spaces = opts.spaces || 2

    return function filter (ctx, next) {
        return next().then(() => {
            const body = ctx.body

            const json = isJSON(body)

            if (!json) return

            const hasParam = param && hasOwnProperty.call(ctx.query, param)
            
            if (hasParam) {
                ctx.response.type = 'text'

                ctx.body = YAML.stringify(body, 2)
            }
        })
    }
}