import {useState} from 'react'
import {useWorkoutContext} from '../hooks/useWorkoutContext'


const WorkoutForm =()=>{
    const [title,setTitle]= useState('')
    const [load,setLoad]= useState('')
    const [reps,setReps]= useState('')
    const [error, setError] = useState(null);
    const {dispatch}= useWorkoutContext()



    const handleSubmit=async(e)=>{
        e.preventDefault()
        // console.log(e)

        const workout={
        title, load, reps
        };
//fetch will send req from frontend to backend and get the result which will be save as response from server
      
// Note:So response is the object representing what the server sent back( status,ok,json), not the data itself (you parse it into json)
const response= await fetch('/api/workouts',{
              method:'POST',
              body: JSON.stringify(workout),
              headers: {
                'Content-Type':'application/json'
              }
            }
        )  
        // converts the response string from server back to js object
        const json= await response.json()

        if (!response.ok){
            setError(json.error);
 
        }
        if (response.ok){
            setError(null);
            console.log("New workout added");
            setTitle('');
            setLoad('');
            setReps('');
            dispatch({type:'CREATE_WORKOUT', payload:json})
 
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
            {error && <div className="error">{error}</div>}
        </form>
    </div>
    
    
    </>

    )
}
export default WorkoutForm