import {WorkoutContext} from '../context/WorkoutContext.js'
import {useContext} from 'react'

export const useWorkoutContext=()=>{
    const context = useContext(WorkoutContext)

    if (!context){
        return Error('useWorkoutContet must  be inside a WorkoutContextProvider')
    }


    return(
        context
    )
}