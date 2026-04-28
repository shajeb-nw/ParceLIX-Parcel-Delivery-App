const {
  postParcel,
  getParcel,
  deleteParcel,
} = require("../modules/parcelModule");
const postController = async (req, res) => {
  const parcel = req.body;
  parcel.createdAd = new Date();
  try {
    const result = await postParcel(parcel);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getController = async (req, res) => {
  try {
    const query = req.query;
    const result = await getParcel(query);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteController = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await deleteParcel(id);

    if (result.deletedCount === 1) {
      res.status(200).json({
        success: true,
        message: "Parcel deleted successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Parcel not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { postController, getController, deleteController };
