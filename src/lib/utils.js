import jwt from "jsonwebtoken"

export const  generateToken =(userId,res)=>{
const token=jwt.sign({userId},process.env.jwt_secret,{
  expiresIn:"7d"
})

res.cookie("jwt",token,{
  maxAge:7*24*60*60*1000,
  httpOnly:true, //prevent xss attacks cross-site attacks
  sameSite:"strict", //csrf attacks
  secure:process.env.node_env !== "development"
})

}