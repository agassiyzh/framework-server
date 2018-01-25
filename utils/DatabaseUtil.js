const sqlite3 = require('sqlite3').verbose();
const serverRootDir = require('./FileUtils.js').serverRootDir;



function createDB () {
    const db = new sqlite3.cached.Database(serverRootDir + '/db.sqlite3');

    return db;
}

module.exports.createDatabase = async() => {
    const db = createDB();
    
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
            db.run(createDatabaseSQL);
        });  
    } catch (error) {
        console.log(error);
        
    }finally {
        db.close();
    }

}

module.exports.queryDB = async(params) => {
    const SQL = `SELECT * FROM Framework `;
}

module.exports.insertDB = async(params, callback) => {
    console.log(params);

    excuteDB(
        "INSERT INTO Framework (environment, version, frameworkName, featureName, changelog, commitHash) VALUES (?, ?, ?, ?, ?, ?)", [
            "params.environment",
            "params.version",
            "params.frameworkName",
            "params.featureName",
            "params.changelog",
            "params.commitHash"
        ],
        (error) => {
            console.log(error);

            callback()

        }
    );
}