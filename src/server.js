import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import { connectDB } from "./lib/db.js"
import cookieParser from "cookie-parser"
const app = express()
app.use(express.json())
dotenv.config()
app.use(cookieParser())

app.use("/api/auth/",authRoutes)
app.use("/api/message/",messageRoutes)
const port = process.env.PORT || 5000

app.listen(port, (req,res)=>{
  console.log(`server is running on port ${port}` )
  connectDB()
})