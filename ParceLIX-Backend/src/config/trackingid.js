const createTrackingId = () => {
  const prefix = "TRK"; // optional
  const timestamp = Date.now().toString().slice(-6); // last 6 digits
  const random = Math.floor(1000 + Math.random() * 9000); // 4 digit random

  return `${prefix}-${timestamp}-${random}`;
};
module.exports=createTrackingId