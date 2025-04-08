import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import { connectDB } from "./lib/db.js"
import { app , server,io} from "./lib/socket.js"
dotenv.config()
app
app.use(cookieParser())
// ✅ Increase payload size limit
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true, // Allows cookies to be sent
}));

app.use("/api/auth/",authRoutes)
app.use("/api/messages/",messageRoutes)
const port = process.env.PORT || 5000

app.get("/", (req, res) => {
  res.send("API is running...");
});

server.listen(port, (req,res)=>{
  connectDB()
  console.log(`server is running on port ${port}` )
})