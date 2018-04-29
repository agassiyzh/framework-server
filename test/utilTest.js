'use strict';

const should = require('chai').should();
const fileUtils = require('../server/utils/FileUtils');
const DatabaseUtil = require('../server/utils/DatabaseUtil');
const path = require('path');

const timestamp = Date.now();

const params = {
    frameworkName: "frameworkName",
    version: "${timestamp}",
    changelog: "test"
};

describe('Database util test', () => {





    it('instert row test', async () => {

        const result = await DatabaseUtil.insertDB(params)
            .catch((error) => {
                console.error(error);
            });

        result.should.equal(true)
    })

    it('build where statement from parameters test', () => {
        const statement = DatabaseUtil.buildWhereFromParams({
            "environment": "development",
            "commit": "ajhdrf8239ekojh",
            "featureName": "featureName"
        })

        statement.should.equal("environment='development' AND commit='ajhdrf8239ekojh' AND featureName='featureName'")
    })

    it('query row test', async () => {

        const result = await DatabaseUtil.queryDB({
            frameworkName: "frameworkName",
            version: "1.2"
        }).catch(error => {
            console.log(error)
            should.not.exist(error)
        })

    })

    it('delete row test', async () => {
        const result = await DatabaseUtil.deleteFramework(params)
            .catch((error) => {
                console.error(error);
            });

        result.should.equal(true)
    })
})

describe('file utils test', () => {
    it('check file path', () => {

        const filePath = fileUtils.getFileAbsolutePathWithParameters(params);

        filePath.should.equal(path.join(fileUtils.serverRootDir, "Frameworks", params.frameworkName, params.version, params.frameworkName + '.framework.zip'))
    })
})