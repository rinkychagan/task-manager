const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017/taskmanager";

let client;

const connectDB = async () => {
  if (!client) {
    client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    console.log("Connected to MongoDB");
  }
  return client.db();
};

module.exports = connectDB;
