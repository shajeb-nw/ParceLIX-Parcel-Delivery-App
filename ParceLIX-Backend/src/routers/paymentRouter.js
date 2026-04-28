const express=require("express")
const {paymentController,paymentSuccessController,getController}=require("../controller/paymentController")
const router=express.Router()

router.post("/",paymentController)
router.patch("/",paymentSuccessController)
router.get("/" ,getController)
module.exports=router