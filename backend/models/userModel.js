const mongoose= require('mongoose')

const Schema= mongoose.Schema

const userSchema= new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,

    }

})

modules.export= mongoose.model('User', userSchema)