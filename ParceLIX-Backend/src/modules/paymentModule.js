const env = require("../config/env");
const { ObjectId } = require("mongodb");
const { getDB } = require("../config/db");
const stripeKey = env.stripe_key;

const stripe = require("stripe")(stripeKey);

const getModule = async (data) => {
  const db=getDB()
  const email=data.email
  const query={}
  if(email){
    query.senderEmail=email
  }
  const result=await db.collection("PaymentCollection").find(query).toArray()
  return result
};

const paymentModule = async (data) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "bdt",
          product_data: {
            name: data.parcelName,
          },
          unit_amount: data.parcelCost * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    customer_email: data.senderEmail,
    metadata: {
      parcelId: data._id,
      senderName: data.senderName,
      senderEmail: data.senderEmail,
      senderPhone: data.senderPhone,
      paymentDate: new Date().toISOString(),
      trackingId: data.trackingId,
    },
    success_url: `${env.clientUrl}/deashbord/paymentSuccess?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${env.clientUrl}/deashbord/paymentError`,
  });
  return session;
};

const paymentSuccessModule = async (data) => {
  const db = getDB();
  const session = await stripe.checkout.sessions.retrieve(data);
  if (session.payment_status !== "paid") {
    throw new Error("Payment not completed");
  }
  const parcelId = session.metadata.parcelId;

  const result = await db.collection("data").updateOne(
    { _id: new ObjectId(parcelId) },
    {
      $set: {
        paymentStatus: "paid",
        transactionId: session.id,
        paidAt: new Date(),
      },
    },
  );
  const transition=session.payment_intent
  const trasitionSearch=await db.collection("PaymentCollection").findOne({transactionId:transition})
  if(trasitionSearch){
     return { message: "Payment already recorded" };
  }
  const paymentHistory = await db.collection("PaymentCollection").insertOne({
    parcelId: new ObjectId(parcelId),
    amount: session.amount_total / 100,
    currency: session.currency,
    customerEmail: session.customer_email,
    senderName: session.metadata.senderName,
    senderEmail: session.metadata.senderEmail,
    senderPhone: session.metadata.senderPhone,
    transactionId: session.payment_intent,
    paymentStatus: session.payment_status,
    trackingId: session.metadata.trackingId,
    createdAt: new Date(),
  });

  return { result, paymentHistory };
};
module.exports = { paymentModule, paymentSuccessModule, getModule };
