const express=require("express")
const {postController,getController,deleteController}=require("../controller/parcelController")
const router=express.Router()

router.post("/" , postController)
router.get("/",getController)
router.delete("/:id",deleteController)

module.exports=router