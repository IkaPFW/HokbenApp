const { MongoClient } = require("mongodb");

// Connection URI
// const uri = "mongodb://0.0.0.0:27017";
const uri = "mongodb+srv://IkaPFW:110K83Napp@hokbenapp.bz3t252.mongodb.net/test"

// Create a new MongoClient

let db = null

async function getDatabase(){
    try {
        const client = new MongoClient(uri);
        const database = client.db("hokben-app")

        db = database
        
        return database
    } catch (error) {
        console.log("Error while accessing database");
    }
}

async function getCurrentDatabase(){
    return db
}

module.exports = {
    db,
    getDatabase,
    getCurrentDatabase
}

// async function run() {
//   try {
//     // Connect the client to the server (optional starting in v4.7)
//     await client.connect();

//     // Establish and verify connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Connected successfully to server");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
