const mongoose= require('mongoose')
const bcrypt= require('bcrypt')


const Schema= mongoose.Schema

const userSchema= new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,

    }

})

//Static method called signUp on userSchema model
//cantt use this with arrow function
userSchema.statics.signUp= async function(req, res){
    const {email,password} = req.body
    email='hello@jnd'
    password='212'

    const exists= await this.findOne({email: email})
    if (exists){
        throw Error('This email was already used ')
    }

    const salt = bcrypt.genSalt(10,password)
    const hash= bcrypt.hash(password,salt)
    console.log(salt, password)


}

module.export= mongoose.model('User', userSchema)