import { useEffect } from "react"
import { useWorkoutContext } from "../hooks/useWorkoutContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"
const API_BASE_URL = process.env.REACT_APP_API_URL || '';


const Home = () => {
  const { workouts, dispatch } = useWorkoutContext()
  const {user}= useAuthContext()


fetch(`${API_BASE_URL}/api/hello`)
  .then(res => res.json())
  .then(data => console.log(data));


  useEffect(() => {
    const fetchWorkouts = async () => {
      console.log(`${API_BASE_URL}/api/workouts`)
      const response = await fetch(`${API_BASE_URL}/api/workouts`,{
        headers:
        {
          'Authorization':`Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_WORKOUTS', payload: json})
         
      }
     
    }
     if (user){
        fetchWorkouts()
      }

   
  }, [dispatch,user])

  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map(workout => (
          <WorkoutDetails workout={workout} key={workout._id} />
        ))}
      </div>
      <WorkoutForm />
    </div>
  )
}

export default Home