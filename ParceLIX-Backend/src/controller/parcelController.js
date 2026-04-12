const { postParcel,getParcel } = require("../modules/parcelModule");
const createParcel = async (req, res) => {
  try {
    const result = await postParcel(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getController=async(req,res)=>{
  try {
    const result=await getParcel()
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}



module.exports={createParcel,getController}





