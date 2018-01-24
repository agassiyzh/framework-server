const should = require('chai').should();
const DatabaseUtil = require('../utils/DatabaseUtil');

describe('Database util test', () => {
    it('instert row test', () => {
        DatabaseUtil.insertDB({
            environment: "DEVELOPMENT",
            frameworkName: "frameworkName",
            commitHash: "kajdlfj2olkj",
            featureName: "featureName",
            version: "1.0"
        })
    })
})