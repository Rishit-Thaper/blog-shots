import {useState} from 'react';
import { useAuthContext } from './useAuthContext';

type SignupError = {
    message: string
}

export const useSignup = () =>{
    const [error, setError] = useState<SignupError | null>(null);
    const [loading, setLoading] = useState(false);
    const {login} = useAuthContext();

    const handleSignup = async (name: string, email: string, password: string) =>{
        setLoading(true);
        setError(null);
        try {
            const response = await fetch("http://localhost:8000/api/user/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({name, email, password}),
            });
            const data = await response.json();
            if (data.error) {
                setError(data);
            } else {
                login(data);
            }
        } catch (error) {
            setLoading(false);
            setError({ message: 'An unexpected error occurred' });
        }
    }    
    return {handleSignup, error, loading};
}