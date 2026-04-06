const express = require('express')
const cors = require('cors')
const corsOptions=require("./config/cors.config")

const app = express()

app.use(cors(corsOptions))
app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello World! this is new start')
})

module.exports = app