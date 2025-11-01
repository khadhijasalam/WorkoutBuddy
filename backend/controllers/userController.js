const User= require('../models/userModel')

//login user

const loginUser = async( req,res)=>{
    res.json({msg:'login user'})
}



//sign up user
const signUpUser= async (req,res)=>{
    res.msg({msg:'signUp User'})
}


module.exports= {loginUser, signUpUser}