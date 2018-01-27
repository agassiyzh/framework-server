'use strict';

const sqlite3 = require('sqlite3').verbose();
const serverRootDir = require('./FileUtils.js').serverRootDir;



function getDB() {
    const db = new sqlite3.cached.Database(serverRootDir + '/db.sqlite3');

    return db;
}

module.exports.createDatabase = async (callback = (err)=>{}) => {
    const db = getDB();

    const createDatabaseSQL = `CREATE TABLE IF NOT EXISTS Framework ( 
        id integer PRIMARY KEY autoincrement,
        version TEXT,
        frameworkName TEXT,
        featureName TEXT,
        changelog TEXT,
        environment TEXT,
        commitHash TEXT 
      );
        CREATE UNIQUE INDEX IF NOT EXISTS framework_PRODUCTION_I ON Framework (version, environment, frameworkName);
        CREATE UNIQUE INDEX IF NOT EXISTS framework_DEVELOPMENT_I ON Framework (commitHash, environment, frameworkName);
      `

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

              db.run("CREATE UNIQUE INDEX IF NOT EXISTS framework_PRODUCTION_I ON Framework (version, environment, frameworkName);");

              db.run("CREATE UNIQUE INDEX IF NOT EXISTS framework_DEVELOPMENT_I ON Framework (commitHash, environment, frameworkName);");
        });

        
    } catch (error) {
        
        console.log(error);

    } finally {
        callback();
    }

}

module.exports.queryDB = async (params, callback) => {
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

    db.close();

}

module.exports.insertDB = (params, callback) => {

    const db = getDB();

    db.run(
        "INSERT INTO Framework (environment, version, frameworkName, featureName, changelog, commitHash) VALUES (?, ?, ?, ?, ?, ?)",
        params.environment,
        params.version,
        params.frameworkName,
        params.featureName,
        params.changelog,
        params.commitHash,
        (error) => {
            callback(error);
        }
    );
    db.close();
}