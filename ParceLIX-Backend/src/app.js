const express = require('express')
const cors = require('cors')
const corsOptions=require("./config/cors.config")
const parcelRouter=require("./routers/parcelRouter")

const app = express()

app.use(cors(corsOptions))
app.use(express.json())

app.use("/parcel", parcelRouter);

app.get('/', (req, res) => {
  res.send('Hello World! this is new start')
})

module.exports = app