import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext()

export const authReducer = (state, action)=>{
    switch (action.type){
        case 'LOGIN':
            return{ author: action.payload }
            case 'LOGOUT':
                return{ author: null }
            default:
                return state
    }
}
export const AuthContextProvider = ({children})=>{
   
    const [state, dispatch] = useReducer(authReducer,{
        author:null
    })

    useEffect(()=>{
        const author = JSON.parse(localStorage.getItem('user'));
        if(author){
            dispatch({type: 'LOGIN', payload:author})
        }
    
    },[])
    
    
    console.log('AuthContext State', state)

    return(
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}