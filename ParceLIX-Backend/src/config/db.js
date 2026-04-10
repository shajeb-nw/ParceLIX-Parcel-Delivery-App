const { MongoClient, ServerApiVersion } = require("mongodb");
const env = require("./env");
const uri = env.mongo_url;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;
const connectDB = async function run() {
  try {
    await client.connect();
    db = client.db("ParceLIX");
    // const psenderInfo = mydb.collection("psenderInfo");

    await client.db("admin").command({ ping: 1 });
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ DB Connection Failed:", error.message);
    process.exit(1);
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
};

const getDB = () => {
  if (!db) {
    throw new Error("Database not initialized!");
  }
  return db;
};

module.exports = { connectDB, getDB };
