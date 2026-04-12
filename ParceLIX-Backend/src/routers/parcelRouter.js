const express=require("express")
const {createParcel,getController}=require("../controller/parcelController")
const router=express.Router()

router.post("/" , createParcel)
router.get("/",getController)

module.exports=router