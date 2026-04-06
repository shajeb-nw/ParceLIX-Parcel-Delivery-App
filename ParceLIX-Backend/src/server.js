const app=require('./app.js')
const env=require("./config/env.js")
const port = env.port


app.listen(port, () => {
  console.log(`Example app listening on port  ${port}`)
})
  