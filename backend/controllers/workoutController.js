const Workout=require('../models/workoutModel')
const mongoose=require('mongoose')

//get all workouts
const getAllWorkouts= async(req, res)=>{
    // const {}= req.body
    
    try{
        const allWorkouts= await Workout.find({}).sort({createdAt:-1})
        return res.status(200).json(allWorkouts)
        
    }
    catch(err){
        return res.status(400).json({error: err.messgae})
    }
}




//get a single workout

const getWorkout= async(req,res)=>{
    const {id} = req.params

    //to stop internal code crash from wrong id in url
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workound found'})

    }

    try{
        const workout= await Workout.findById(id)
        if(!workout){
            return res.status(404).json({error:'No such workout found'})
        }
       return res.status(200).json(workout)

    }catch(error){
        return res.status(400).json({error: error.message})
    }
    
}

// const 


///create new workout

const createWorkout= async(req, res)=>{
    const {title, load, reps}= req.body

    //enter data to mongodb
    try{
        const workout =await Workout.create({title,reps,load})
       return res.status(200).json(workout)

    }catch(error){
       return res.status(400).json({error: error.message})
    }
    
}

//delete a workout
const deleteWorkout= async(req, res)=>{
    const {id}=req.params
      if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workound found'})

    }

    try{
        const workout= await Workout.findOneAndDelete({_id:id})
        if(!workout){
            return res.status(404).json({error:'No such workout found'})
        }
       return res.status(200).json({msg:'deleted'})

    }catch(error){
        return res.status(400).json({error: error.message})
    }

}


//update a workout
const updateWorkout= async(req, res)=>{
    const {id}=req.params
      if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workound found'})

    }

    try{
        const workout= await Workout.findOneAndUpdate({_id:id},{...req.body})
        if(!workout){
            return res.status(404).json({error:'No such workout found'})
        }

       return res.status(200).json(workout)

    }catch(error){
        return res.status(400).json({error: error.message})
    }

}


module.exports={
    getAllWorkouts,
    getWorkout,
    createWorkout,
    updateWorkout,
    deleteWorkout
}