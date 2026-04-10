const app=require('./app.js')
const env=require("./config/env.js")
const {connectDB}=require("./config/db")
const port = env.port




const serverStart=async()=>{
 try {
    await connectDB()

    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`)
    })

  } catch (error) {
    console.error("❌ Server failed:", error.message)
  }
}
serverStart()