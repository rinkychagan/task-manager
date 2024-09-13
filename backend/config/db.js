const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const dbName = "taskmanager";

let client;

const connectDB = async () => {
  if (!client) {
    client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    try {
      await client.connect();
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Failed to connect to MongoDB", error);
      throw error;
    }
  }
  return client.db(dbName);
};

module.exports = connectDB;
