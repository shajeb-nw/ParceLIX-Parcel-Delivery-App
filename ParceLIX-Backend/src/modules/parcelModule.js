const {getDB}=require("../config/db")
const postParcel=async(data)=>{
    const db=getDB()
    const result=await db.collection("data").insertOne(data)
    return result
}
module.exports={postParcel}

