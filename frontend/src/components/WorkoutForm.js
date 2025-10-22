import {useState} from 'react'

const WorkoutForm =()=>{
    const [title,setTitle]= useState('')
    const [load,setLoad]= useState('')
    const [reps,setReps]= useState('')



    const handleSubmit=async(e)=>{
        e.preventDefault()
        // console.log(e)

        const workout={
        title, load, reps
        };

        const response= await fetch('/api/workouts',{
              method:'POST',
              body: JSON.stringify(workout),
              headers: {
                'Content-Type':'application/json'
              }
            }
        )  
        const json= await response.json()

        if (!response.ok){
            return(
                <p>{json.error}</p>
            )
        }

    }


    return(<>
    <div className="create">
        <form onSubmit={handleSubmit}>

            <label htmlFor="title" > Workout Title:</label>
            <input type="text"
            onChange={(e)=> setTitle(e.target.value)}
            value={title}
             id="title" name="title" 
            />
            <label htmlFor="load" > Load (in Kg): </label>
            <input type="number"
            onChange={(e)=> setLoad(e.target.value)}
            value={load}
             id="load" name="load" 
            />
            <label htmlFor="reps" >Reps: </label>
            <input type="number"
            onChange={(e)=> setReps(e.target.value)}
            value={reps}
             id="reps" name="reps" 
            />
            <button type="submit">Add Workout</button>
            {}
        </form>
    </div>
    
    
    </>

    )
}
export default WorkoutForm