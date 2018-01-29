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

    it('instert row test', (done) => {

        const timestamp = Date.now();

        DatabaseUtil.insertDB({
            environment: "DEVELOPMENT",
            frameworkName: "frameworkName",
            commitHash: "1",
            featureName: "featureName",
            version: timestamp
        }, (err) => {
            console.log('did insert');

            should.not.exist(err);

            console.log(err);
            done();
        });
    })    
})


describe('query db', () => {
    
    it('query row test', (done) => {

        DatabaseUtil.queryDB({
            environment: "DEVELOPMENT",
            frameworkName: "frameworkName",
            commitHash: "2",
            featureName: "featureName",
            version: "1.2"
        }, (err, row) => {
            should.not.exist(err);
            // row.should.have.property('environment')

            done();
        });
    })
})