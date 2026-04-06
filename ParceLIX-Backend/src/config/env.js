require('dotenv').config()

const env={
    port:process.env.PORT||3000,
    clientUrl:process.env.CLIENT_URL
}
module.exports=env