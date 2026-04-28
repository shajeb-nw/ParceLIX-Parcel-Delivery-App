const {
  paymentModule,
  paymentSuccessModule,
  getModule,
} = require("../modules/paymentModule");
const { getDB } = require("../config/db");

const getController = async(req, res) => {
  try {
    const query=req.query
    const result=await getModule(query)
    res.status(200).json(result)
    
  } catch (error) {
    res.status(500).json({message:error.message})
  }
};

const paymentController = async (req, res) => {
  try {
    const parcel = req.body;
    
    const session = await paymentModule(parcel);
    res.send({
      url: session.url,
    });
  } catch (error) {
    res.status(500).send({ error: "Payment failed" });
  }
};
const paymentSuccessController = async (req, res) => {
  try {
    const session_id = req.query.session_id;
    if (!session_id) {
      return res.status(400).send({ error: "session_id is required" });
    }
    const result = await paymentSuccessModule(session_id);
    res.send({
      message: "Payment verified & updated",
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
};
module.exports = { paymentController, paymentSuccessController, getController };
