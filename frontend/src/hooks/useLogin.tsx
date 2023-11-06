import {useState} from 'react';
import { useAuthContext } from './useAuthContext';

export type LoginError = {
    message: string
}

export const useLogin = () =>{
    const [error, setError] = useState<LoginError | null>(null);
    const [loading, setLoading] = useState(false);
    const {login} = useAuthContext();

    const handleLogin = async (email: string, password: string) =>{
        setLoading(true);
        setError(null);
        try {
            const response = await fetch("http://localhost:8000/api/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email, password}),
            });
            const data = await response.json();
            if (data.error) {
                setError(data as LoginError);
                console.log(`Error: ${error}`);
            } else {
                login(data);
                console.log(`login successful ${data}`);
            }
        } catch (error) {
            setLoading(false);
            setError({ message: 'An unexpected Login error occurred' });
            alert(error);
        }
    }    
    return {handleLogin, error, loading};
}