import { useState } from 'react'
import { useWorkoutContext } from '../hooks/useWorkoutContext'
import { useAuthContext } from '../hooks/useAuthContext'
const API_BASE_URL = process.env.REACT_APP_API_URL;
                             
const WorkoutForm = () => {
  const { dispatch } = useWorkoutContext()

  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('')
  const [reps, setReps] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields,setEmptyFields]=useState([])
  const {user}=useAuthContext()


  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!user){
      setError('User must be logged in')
      return
    }
    console.log(user, user.token)

    const workout = {title, load, reps}
    
    const response = await fetch(`${API_BASE_URL}/api/workouts`, {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json',
       
          'Authorization':`Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      console.log(json)

setEmptyFields(json.emptyFields)
        
        console.log(emptyFields)
      setError(json.error)
    }
    if (response.ok) {
      setError(null)
      setTitle('')
      setLoad('')
      setReps('')
      setEmptyFields([])
      dispatch({type: 'CREATE_WORKOUT', payload: json})
    }

  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Workout</h3>

      <label>Excersize Title:</label>
      <input 
        type="text" 
        className={emptyFields.includes('title') ? 'error':''}     
         onChange={(e) => setTitle(e.target.value)} 
        value={title}
      />

      <label>Load (in kg):</label>
      <input 
        type="number" 
                className={emptyFields.includes('load') ? 'error':''}   

        onChange={(e) => setLoad(e.target.value)} 
        value={load}
      />

      <label>Number of Reps:</label>
      <input 
        type="number" 
                className={emptyFields.includes('reps') ? 'error':''} 
                onChange={(e)=>setReps(e.target.value)}  
        value={reps} 
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default WorkoutForm