import {useState} from 'react'
import {useAuthContext} from './useAuthContext'


export const useLogin =()=>{
const [error,setError]=useState(null)
const [isLoading, setIsLoading]=useState(false)
const {dispatch}=useAuthContext()

const login= async(email,password)=>{
    setIsLoading(true)
    setError(null)

    const response= await fetch('/api/user/login',{
        method:'POST',
        body:JSON.stringify({email,password}),

        headers: {
        'Content-Type': 'application/json'
      }
    })
    const json= await response.json()

    if(!response.ok){
 setIsLoading(false)   
      //to reset previous states

  setError(json.error)

    }
    if(response.ok){
        //store locally in browser. Helps to stay logged in when you close the tab
        localStorage.setItem('user', JSON.stringify(json))

        //update auth context
        dispatch({type:'LOGIN',payload:json})

     
        setIsLoading(false)

    }
    
    

}
    return {login, isLoading, error}


}