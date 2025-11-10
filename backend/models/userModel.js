const mongoose= require('mongoose')
const bcrypt= require('bcrypt')
const validator= require('validator')


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

    if(!email||!password){
        throw Error('All fields must be filled')
    }
    if(!validator.isEmail(email)){
        throw Error('Enter a valid email')
    }
    const exists= await this.findOne({email:email})
    if (exists){
        throw Error('This email was already used ')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password is not strong enough')
    }

    const salt = await bcrypt.genSalt(10)
    const hash= await bcrypt.hash(password,salt)

    const user= await this.create({email,password:hash})


    return user


}

userSchema.statics.login= async function(email,password){
    if(!email||!password){
        throw Error('All fields must be filled')
    }

    const user= await this.findOne({email})
    if (!user){
        throw Error('There is no account associated with this email')
    }

    const validUser= await bcrypt.compare(password,user.password)
    // console.log(validUser)
      if (!validUser) {
    throw Error('Incorrect password')
  }
    return user
}



// module.export=signUp()
module.exports= mongoose.model('User', userSchema)