const express=require("express")
const {createParcel}=require("../controller/parcelController")
const router=express.Router()

router.post("/" , createParcel)


module.exports=router