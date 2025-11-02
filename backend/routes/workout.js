const express = require('express')
// const Workout=require('../models/workoutModel')

const {createWorkout,getAllWorkouts,getWorkout, deleteWorkout,updateWorkout}= require('../controllers/workoutController')

const router= express.Router()

// Get all workouts
router.get('/',getAllWorkouts)

// GET a single workout
router.get('/:id',getWorkout)


//POST a  workout
router.post('/',createWorkout)

//DELETE a  workout
router.delete('/:id',deleteWorkout)
//UPDATE a  workout
router.patch('/:id',updateWorkout)


module.exports=router