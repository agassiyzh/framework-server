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
        wherePairs.push(key + '=' + "'" + params[key] + "'");
    }

    return wherePairs.join(" AND ");
}

module.exports.buildWhereFromParams = buildWhereFromParams;

module.exports.queryDB =  (params) => {

    return new Promise((resolve, reject) => {
        const db = getDB();


        let whereStatement = buildWhereFromParams(params);

        let SQL = "SELECT * FROM Framework WHERE " + whereStatement;

        db.all(SQL, (error, rows) => {
            if (error) {
                reject(error);
            } else {
                resolve(rows);
            }
        })

        db.close(() => {
        });
    });

}

module.exports.deleteFramework = (params) => {

    return new Promise((resolve, reject) => {
        const db = getDB();

        const whereStatement = buildWhereFromParams(params);

        const SQL = "DELETE FROM Framework WHERE " + whereStatement;

        db.exec(SQL, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
        });

        db.close();
    });

}

module.exports.insertDB = (params) => {

    return new Promise((resolve, reject) => {
        const db = getDB();

        db.run(
            "INSERT INTO Framework (version, frameworkName, changelog) VALUES (?, ?, ?)", [
                params.version,
                params.frameworkName,
                params.changelog
            ],
            (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(true);
                }

            }
        );

        db.close(() => {
        });
    })

}