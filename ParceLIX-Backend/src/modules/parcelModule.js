const { getDB } = require("../config/db");
const ParceltackindId=require("../config/trackingid")
const { ObjectId } = require("mongodb");

const postParcel = async (data) => {
  const trackingId=ParceltackindId()
  const db = getDB();
  const parcelDetails={
    ...data,
   trackingId,
  }
  const result = await db.collection("data").insertOne(parcelDetails);
  return result;
};

const getParcel = async (data) => {
  const db = getDB();
  const email = data.email;
  const query = {};
  if (email) {
    query.senderEmail = email;
  }

  const result = await db.collection("data").find(query).sort({createdAd:-1}).toArray();  
  return result;
};

const deleteParcel = async (id) => {
  const db = getDB();
  const query = { _id: new ObjectId(id) };
  const result = await db.collection("data").deleteOne(query);
  return result;
};
module.exports = { postParcel, getParcel, deleteParcel };
