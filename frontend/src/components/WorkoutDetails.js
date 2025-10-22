const WorkoutDetails = ({workout})=>{

return(
    <>
    <div className="workout-details">
    <h4> {workout.title}</h4>
        <p><strong>Load (kgs): </strong>{workout.load}</p>

    <p><strong>Reps: </strong>{workout.reps}</p>
    <p> {workout.createdAt || workout.updatedAt}</p>
     </div>
    </>
)

}

export default WorkoutDetails