const {getDB}=require("../config/db")
const postParcel=async(data)=>{
    const db=getDB()
    const result=await db.collection("data").insertOne(data)
    return result
}

const getParcel= async()=>{
    const db=getDB()
    const result=await db.collection("data").find().toArray()
    return result
}
module.exports={postParcel,getParcel}