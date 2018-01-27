'use strict';

const should = require('chai').should();
const DatabaseUtil = require('../utils/DatabaseUtil');

describe('Database util test', () => {

    it ('create table index test', (done)=> {
        DatabaseUtil.createDatabase((error) => {
            should.not.exist(error);
            done();
        });
    });

    it('instert row test', (done) => {
        DatabaseUtil.insertDB({
            environment: "DEVELOPMENT",
            frameworkName: "frameworkName",
            commitHash: "1",
            featureName: "featureName",
            version: "1.2"
        }, (err) =>{
            should.not.exist(err)
            
            done();
        });
    })

    it('query row test', (done) => {
        DatabaseUtil.queryDB({
            environment: "DEVELOPMENT",
            frameworkName: "frameworkName",
            commitHash: "kajdlfj2olkjhjhdjfsj",
            featureName: "featureName",
            version: "1.0"
        }, (err, row) =>{
            should.not.exist(err)

            row.should.have.property('environment')
            
            done();
        });
    })
})