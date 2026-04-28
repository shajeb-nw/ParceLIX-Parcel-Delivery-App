require('dotenv').config()

const env={
    port:process.env.PORT||3000,
    clientUrl:process.env.CLIENT_URL,
    mongo_url:process.env.MONGO_URL,
    stripe_key:process.env.STRIPE_SECRET_KEY
}
module.exports=env