//for .env files. we access using process.env
require('dotenv').config()
const express= require('express')
const mongoose= require('mongoose')
const workoutRoutes=require('./routes/workout.js')
const userRoutes=require('./routes/workout.js')






// Start express app. (creates express application instance)
const app=express()

//middleware that allows server to access data sent by the client( frontend, browser).(post, update etc)
// parses the JSON in http request
app.use(express.json())


app.use((req,res,next)=>{
    console.log(req.path, req.method)
    //without next()  the request won't continue to the next middleware or route handler
    next()
})

//routes
app.use('/api/workouts/',workoutRoutes)
app.use('/api/user',userRoutes)
// app.use('api/')


console.log(process.env.PORT)
console.log(process.env.MONGO_URI)


mongoose.connect((process.env.MONGO_URI)).then(()=>{
    console.log('mongodb connected')
    app.listen(process.env.PORT,()=>{
    console.log(`listening on port ${process.env.PORT}`)
}
)}

)
.catch((err)=>
console.log(err))


// Listen for request




