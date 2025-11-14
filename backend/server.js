//for .env files. we access using process.env
require('dotenv').config()
const express= require('express')
const cors =require('cors')
const mongoose= require('mongoose')
const workoutRoutes=require('./routes/workout.js')
const userRoutes=require('./routes/user.js')


// Start express app. (creates express application instance)
const app=express()


// ✅ Step 1: Define CORS options clearly
const allowedOrigins = [
  'https://workout-buddy-one-lovat.vercel.app',
  'http://localhost:3000',
  'http://localhost:4000'
];

const corsOptions = {
    origin: function (origin, callback) {
    console.log("Request from origin:", origin);

    if (!origin) {
      return callback(null, true); // Allow tools like Postman
    }

    // 🔥 FIX: allow origins that start with allowedOrigins (handles trailing slashes)
    const isAllowed = allowedOrigins.some(o => origin.startsWith(o));

    if (isAllowed) {
      callback(null, true);
    } else {
      console.log("❌ Blocked by CORS:", origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// ✅ Step 2: Apply CORS *before* JSON middleware
app.use(cors(corsOptions));


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
app.use('/api/user/',userRoutes)

app.get('/api/test', (req, res) => {
  res.json({ message: 'CORS working and backend reachable!' });
});


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




