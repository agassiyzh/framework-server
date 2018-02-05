'use strict';

const should = require('chai').should();
const DatabaseUtil = require('../utils/DatabaseUtil');

describe('Database util test', () => {

    it('create table index test', (done) => {

        DatabaseUtil.createDatabase((error) => {
            should.not.exist(error);
            done();
        });
    });

    it('instert row test', async () => {

        const timestamp = Date.now();

        const result = await DatabaseUtil.insertDB({
            environment: "DEVELOPMENT",
            frameworkName: "frameworkName",
            commitHash: "1",
            featureName: "featureName",
            version: timestamp
        }).catch((error) => {
            console.error(error);
        });

        result.should.equal(true)
    })    
})


describe('query db', () => {
    
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
})