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

module.exports.queryDB =  (conditions, selectColumn = [], distinct = false) => {

    return new Promise((resolve, reject) => {
        let db = getDB();

        let selectColumnSmt = "*"

        if (selectColumn instanceof String) {
            selectColumnSmt = selectColumn
        }else if (selectColumn instanceof Array && selectColumn.length > 0) {
            selectColumnSmt = selectColumn.join(',')
        }

        var SQL = `SELECT ${distinct? '' : 'DISTINCT'} ${selectColumnSmt} FROM Framework`

        if (conditions instanceof Object && Object.keys(conditions).length > 0) {
            let whereStatement = buildWhereFromParams(conditions);
            SQL = "SELECT * FROM Framework WHERE " + whereStatement
        }else if (conditions instanceof String && conditions.length > 0) {
            SQL = "SELECT * FROM Framework WHERE " + conditions
        }

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