import React,{useEffect, useState} from 'react'
import { useAuthContext } from '../hooks/useAuthContext';
function useFetch(url) {

    const {author} = useAuthContext();
    const [blogs, setBlogs] = useState([]);
    const [load, setLoad] = useState(true);

    useEffect(()=>{
        setLoad(true);
        try{
            fetch(url,{
                method: 'GET',
                mode: 'cors',
                headers:{
                    'Authorization': `Bearer ${author.token}`
                }
            })
            .then((res)=>res.json())
            .then((data)=>{
                console.log(data);
                setBlogs(data);
                setLoad(false);
            })
            .catch((error)=>{
                console.error('Error fetching data', error);
                setLoad(false);
            })
        }catch(error){
            console.log(error);
            setLoad(false);
        }
    },[])

    return {blogs ,load};
}

export default useFetch;