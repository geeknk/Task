const {MongoClient} = require('mongodb');
const url = "mongodb://localhost:27017";
const db_name = "mydb"

const client = new MongoClient(url);

async function dbConnect(){
    let result = await client.connect();
    db = result.db(db_name);
    return db;
}

module.exports = dbConnect;