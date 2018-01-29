'use strict';

const sqlite3 = require('sqlite3').verbose();
const serverRootDir = require('./FileUtils.js').serverRootDir;



function getDB() {
    const db = new sqlite3.Database(serverRootDir + '/db.sqlite3');

    return db;
}

module.exports.createDatabase = async (callback = (err) => {}) => {
    const db = getDB();

    console.log(db);
    

    try {
        db.serialize(() => {
            db.run(`CREATE TABLE IF NOT EXISTS Framework ( 
                id integer PRIMARY KEY autoincrement,
                version TEXT,
                frameworkName TEXT,
                featureName TEXT,
                changelog TEXT,
                environment TEXT,
                commitHash TEXT 
              );`);

            db.run("CREATE UNIQUE INDEX IF NOT EXISTS framework_I ON Framework (commitHash, version, environment, frameworkName);");
        });


    } catch (error) {

        console.log(error);

    } finally {
        callback();
    }

}

module.exports.queryDB = async (params, callback = (err, row) => {}) => {
    const db = getDB();
    

    if (params.environment == 'DEVELOPMENT') {

        const SQL = `SELECT * FROM Framework WHERE
            environment=? AND
            frameworkName=? AND
            commitHash=?;
        `;


        db.get(SQL,
            params.environment,
            params.frameworkName,
            params.commitHash,
            (err, row) => {

                callback(err, row);
            }
        )

    } else if (params.environment == 'PRODUCTION') {
        const SQL = `SELECT * FROM Framework WHERE
            environment=? AND
            frameworkName=? AND
            version=?;
        `;

        db.get(SQL,
            params.environment,
            params.frameworkName,
            params.version,
            (err, row) => {
                callback(err, row);
            }
        );

    } else {
        throw (Error("envrionment should be DEVELOPMENT or PRODUCTION"));
    }

    db.close(() => {
        console.log('cloase db after query');
        
    });

}

module.exports.insertDB = (params, callback = (error) => {}) => {


    const db = getDB();

    try {
        db.run(
            "INSERT INTO Framework (environment, version, frameworkName, featureName, changelog, commitHash) VALUES (?, ?, ?, ?, ?, ?)", [params.environment,
                params.version,
                params.frameworkName,
                params.featureName,
                params.changelog,
                params.commitHash
            ],
            (error) => {
                callback(error);
            }
        );
    } catch (error) {
        console.log(error);

    }

    db.close(() => {
        console.log('closed db after insert');

    });

}