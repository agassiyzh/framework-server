'use strict';

const should = require('chai').should();
const DatabaseUtil = require('../utils/DatabaseUtil');
const fileUtils = require('../utils/FileUtils');
const path = require('path');

describe('Database util test', () => {

    const timestamp = Date.now();

    const params = {
        environment: "DEVELOPMENT",
        frameworkName: "frameworkName",
        commitHash: "1",
        featureName: "featureName",
        version: timestamp
    };

    it('create table index test', (done) => {

        DatabaseUtil.createDatabase((error) => {
            should.not.exist(error);
            done();
        });
    });

    

    it('instert row test', async () => {

        const result = await DatabaseUtil.insertDB(params)
        .catch((error) => {
            console.error(error);
        });

        result.should.equal(true)
    })

    it('build where statement from parameters test', () => {
        const statement = DatabaseUtil.buildWhereFromParams({
            "environment" : "development",
            "commit" : "ajhdrf8239ekojh",
            "featureName": "featureName"
        })

        statement.should.equal("environment='development' AND commit='ajhdrf8239ekojh' AND featureName='featureName'")
    })

    it('query row test', async () => {

        const result = await DatabaseUtil.queryDB({
            environment: "DEVELOPMENT",
            frameworkName: "frameworkName",
            commitHash: "1",
            featureName: "featureName",
            version: "1.2"
        }).catch(error => {
            console.log(error)
            should.not.exist(error)
        })

    })

    it ('delete row test', async () => {
        const result = await DatabaseUtil.deleteFramework(params)
        .catch((error) => {
            console.error(error);
        });

        result.should.equal(true)
    })
})

describe('file utils test', () => {
    it ('check file path', () => {
        const parameters = {
            environment : "DEVELOPMENT",
            frameworkName : "frameworkName",
            commitHash : "kajdlfj2olkj",
            featureName : "featureName"
          };
        const filePath = fileUtils.getFileAbsolutePathWithParameters(parameters);

        filePath.should.equal(path.join(fileUtils.serverRootDir, parameters.environment, parameters.frameworkName, parameters.featureName, parameters.commitHash + '.framework.zip'))
      })
})