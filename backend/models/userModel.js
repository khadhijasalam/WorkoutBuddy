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
userSchema.statics.signUp= async function(email, password){
    

    const exists= await this.findOne({email:email})
    if (exists){
        throw Error('This email was already used ')
    }

    const salt = await bcrypt.genSalt(10)
    const hash= await bcrypt.hash(password,salt)

    const user= await this.create({email,password:hash})


    return user





}
// module.export=signUp()
module.exports= mongoose.model('User', userSchema)