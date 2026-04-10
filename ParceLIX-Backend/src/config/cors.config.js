const env=require("./env")
console.log(env);

const corsOptions = {
  origin: [
    env.clientUrl
  ],
  credentials: true
}

module.exports = corsOptions