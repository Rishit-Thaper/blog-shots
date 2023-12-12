import { useState } from 'react'
import {useAuthContext} from './useAuthContext'


export const useSignup = ()=>{
    const [err, setErr] = useState(null);
    const [load, setLoad] = useState(null);
    const {dispatch} = useAuthContext()
    
    
    const signup = async(name, email, password)=>{
        
        setLoad(true);
        setErr(null);

        const response = await fetch('http://localhost:8000/api/user/signup',{
            
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password})
        })
        const json = await response.json();

        if(!response.ok){
            setLoad(false)
            setErr(json.error)
        }
        if(response.ok){
            //save the user to localstorage
            localStorage.setItem('user', JSON.stringify(json))
            dispatch({type:'LOGIN', payload:json})

            setLoad(false)
        }

    }

    return{signup, load, err};
}