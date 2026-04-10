require('dotenv').config()

const env={
    port:process.env.PORT||3000,
    clientUrl:process.env.CLIENT_URL,
    mongo_url:process.env.MONGO_URL
}
module.exports=env