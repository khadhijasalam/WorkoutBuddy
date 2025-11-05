const User= require('../models/userModel')

//login user

const loginUser = async( req,res)=>{

   return res.json({msg:'login user'})
}



//sign up user
const signUpUser= async (req,res)=>{
    const {email,password}=req.body
    try{
        const user= await User.signUp(email,password)
        return res.status(200).json({email, user})
    }catch(error){
        return res.status(400).json({error:error.message})
    }
   
}


module.exports= {loginUser, signUpUser}