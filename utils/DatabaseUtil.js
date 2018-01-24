const sqlite3 = require('sqlite3').verbose();
const serverRootDir = require('./FileUtils.js').serverRootDir;

function excuteDB(cmd, params, callback) {
    
    var db = new sqlite3.cached.Database(serverRootDir + '/db.sqlite3');
    console.log(cmd);

    console.log(params);
    
    
    db.run(cmd, params, callback);

    db.close();
}

module.exports.createDatabase = async() => {
    const createDatabaseSQL = "CREATE TABLE IF NOT EXISTS info ( \
        id integer PRIMARY KEY autoincrement,\
        version TEXT,\
        frameworkName TEXT,\
        featureName TEXT,\
        changelog TEXT,\
        environment TEXT,\
        commitHash TEXT, \
        UNIQUE(version, environment, frameworkName, commitHash) \
      )"

    excuteDB(createDatabaseSQL);
}

module.exports.queryDB = async (params) => {
    const SQL = `SELECT * FROM info`;
}

module.exports.insertDB = async (params) => {
    console.log(params);
    
    excuteDB(
        "INSERT INTO info (environment, version, frameworkName, featureName, changelog, commitHash) VALUES (?, ?, ?, ?, ?, ?)",
        ["string", 
        "params.version",
        "params.frameworkName", 
        "params.featureName", 
        "params.changelog", 
        "params.commitHash"],
        (error) => {
            console.log(error);
            
        }
    );
}