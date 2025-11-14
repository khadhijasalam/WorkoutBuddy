import { useWorkoutContext } from '../hooks/useWorkoutContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useAuthContext } from "../hooks/useAuthContext"
const API_BASE_URL = process.env.REACT_APP_API_URL;
            
const WorkoutDetails = ({workout})=>{
  const {user}=useAuthContext()

    const { dispatch } = useWorkoutContext()



     const handleClick = async () => {
      if(!user){
  return
}
console.log(workout._id)

    const response = await fetch(`${API_BASE_URL}/api/workouts/${workout._id}`, {
      method: 'DELETE',
       headers:
        {
          'Authorization':`Bearer ${user.token}`
        }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: json})
    }
  }

return(
    <>
    <div className="workout-details">
    <h4> {workout.title}</h4>
        <p><strong>Load (kgs): </strong>{workout.load}</p>

    <p><strong>Reps: </strong>{workout.reps}</p>
 {workout.createdAt
    ? formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })
    : 'Unknown date'}      <span className="material-symbols-outlined" onClick={handleClick}>delete</span> 
          </div>
    </>
)

}

export default WorkoutDetails