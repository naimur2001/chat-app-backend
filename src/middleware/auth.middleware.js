import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req,res,next)=>{

  try {
    const token=res.cookie.jwt
    
    if (!token) {
      return res.status(401).json({message:"Unauthorized - No token provided"})
    }

    const decoded=jwt.verify(token,process.env.jwt_secret)

    if (!decoded) {
      return res.status(401).json({message:"Unauthorized - Token is not valid"})
    }

    const user=await User.findById(decoded.userId).select("-password")

    if (!user) {
      return res.status(404).json({message:"User not found"})
    }

    req.user = user // calling real user to use next route 
    next()

  } catch (error) {
    console.log("Error in protect route controller", error.message)
    res.status(500).json({message:"Internal server error"})
  }

}