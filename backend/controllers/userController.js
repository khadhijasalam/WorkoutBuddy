const User= require('../models/userModel')
const jwt=require('jsonwebtoken')


//login user

const loginUser = async( req,res)=>{

   return res.json({msg:'login user'})
}

const createToken=(_id)=>{
    return jwt.sign({_id},process.env.SECRET,{expiresIn:"3d"})
}

//sign up user
const signUpUser= async (req,res)=>{
    const {email,password}=req.body
    try{
        const user= await User.signUp(email,password)

         const token = createToken(user._id)
    // console.log(token)
    
        return res.status(200).json({email, token})
    }catch(error){
        return res.status(400).json({error:error.message})
    }
   
}


module.exports= {loginUser, signUpUser}