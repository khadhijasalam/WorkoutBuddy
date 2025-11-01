const Workout= require('../models/userModel')

//login user

const loginUser = async( req,res)=>{
    res.json({msg:'login user'})
}



//sign up user
const signUpUser=(req,res)=>{
    res.msg({msg:'signUp User'})
}


module.exports= {loginUser, signUpUser}