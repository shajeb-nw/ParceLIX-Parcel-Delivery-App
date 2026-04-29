const env=require("./env")
const corsOptions = {
  origin: [
    env.clientUrl
  ],
  credentials: true,
   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
}

module.exports = corsOptions