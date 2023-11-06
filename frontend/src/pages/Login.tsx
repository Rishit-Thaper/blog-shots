import React, { useState } from 'react'
import { useLogin } from '../hooks/useLogin';

function Login() {
  const {handleLogin, error, loading} = useLogin();
  // const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e:any) =>{
        e.preventDefault();

        await handleLogin(email, password);
        console.log(email, password);
        console.log(`Loading: ${loading}`)
        if (error) {
          console.log(`Error: ${error.message}`);
        } else {
          console.log("Login successful!");
        }
    }
  return (
    <div className='account'>
      <div className="intro">
        <h1>BlogShots</h1>
        <h2>Express. Share. Shine.</h2>
      </div>
      <div className="form-div">
        <form onSubmit={handleSubmit}>
            {/* <input type="text" required onChange={(e)=>{setName(e.target.value)}} placeholder='Name' value={name}/> <br /> */}
            <input type="email" required placeholder='Email'onChange={(e)=>{setEmail(e.target.value)}} value={email} />   <br /> 
            <input type="password" required placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}} value={password}/> <br />
            <button className='doIt' disabled={loading} type="submit">Register</button>
            {error && <div className='error'>{error.message}</div>}
        </form>
      </div>
    </div>
  )
}

export default Login