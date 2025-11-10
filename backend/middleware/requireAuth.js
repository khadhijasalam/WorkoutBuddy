const jwt= require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth= async(req,res,next)=>{
    const {authorization}= req.headers

    if(!authorization){
        return res.status(401).json({error:' Authorization Token Required'})
    }
    const token= authorization.split(" ")[1]
    try{
//verify and then return id from it
        const {_id}= jwt.verify(token, process.env.SECRET)
        req.user= await User.findOne({_id}).select('_id')
        if (!req.user) {
  return res.status(401).json({ error: 'User not found' })
}
        next()

    } catch(error){
        return res.status(401).json({error:"Token isn't valid"})
    }
}

module.exports= requireAuth