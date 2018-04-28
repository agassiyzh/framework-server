'use strict';

const sqlite3 = require('sqlite3').verbose();
const serverRootDir = require('./FileUtils.js').serverRootDir;



function getDB() {
    const db = new sqlite3.Database(serverRootDir + '/db.sqlite3');

    return db;
}



function buildWhereFromParams(params) {
    var wherePairs = [];
    for (const key in params) {
        wherePairs.push(key + '=' + "'" +params[key] + "'");
    }

    return wherePairs.join(" AND ");
}

module.exports.buildWhereFromParams = buildWhereFromParams;

module.exports.createDatabase = (callback = (err) => {}) => {
    const db = getDB();
    

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

module.exports.queryDB = (params) => {

    return new Promise( (resolve, reject) => {
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
                    
                    if (err) {
                        reject(err);
                    }else {
                        resolve(row);
                    }
                }
            )
    
        } else if (params.environment == 'PRODUCTION') {
            let SQL = `SELECT * FROM Framework WHERE
                environment=? AND
                frameworkName=?
            `;
    
            let values = [
                params.environment,
                params.frameworkName
            ]

            if (params.version) {
                SQL += " AND version=? "
                values.push(params.version)
                // 这里可以用 all 取第一个
                db.get(SQL, ...values, (err, row) => {
                    if (err) {
                        reject(err);
                    }else {
                        resolve(row);
                    }
                });
            } else {
                db.all(SQL, ...values, (err, row) => {
                    if (err) {
                        reject(err);
                    }else {
                        resolve(row);
                    }
                });
            }
        } else {
            throw (Error("envrionment should be DEVELOPMENT or PRODUCTION"));
        }
    
        db.close(() => {
            console.log('cloase db after query');
            
        });
    });

}

module.exports.deleteFramework = (params) => {
    
    return new Promise((resolve, reject) => {
        const db = getDB();

        const whereStatement = buildWhereFromParams(params);

        const SQL = "DELETE FROM Framework WHERE " + whereStatement;
        
        console.log(SQL)

        db.exec(SQL, (err) => {
            if (err) {
                reject(err);
            }else {
                resolve(true);
            }
        });

        db.close();
    });

}

module.exports.insertDB = (params) => {

    return new Promise((resolve, reject) =>  {
        const db = getDB();

        db.run(
            "INSERT INTO Framework (environment, version, frameworkName, featureName, changelog, commitHash) VALUES (?, ?, ?, ?, ?, ?)", [params.environment,
                params.version,
                params.frameworkName,
                params.featureName,
                params.changelog,
                params.commitHash
            ],
            (error) => {
                if (error) {
                    reject(error);
                }else {
                    resolve(true);
                }
                
            }
        );

        db.close(() => {
            console.log('closed db after insert');
    
        });
    })

}