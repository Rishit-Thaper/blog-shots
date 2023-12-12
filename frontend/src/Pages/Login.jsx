import React, { useState } from 'react'
import { useLogin } from '../hooks/useLogin';

function Login() {
  const {login, err, load} = useLogin();
  // const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) =>{
        e.preventDefault();

        await login(email, password)
        console.log(email, password);
    }
  return (
    <div className='form'>
      <div className="intro">
        <h1>BlogShots</h1>
        <h2>Express. Share. Shine.</h2>
      </div>
      <div className="form-div">
        <form onSubmit={handleSubmit}>
            <input type="email" required placeholder='Email'onChange={(e)=>{setEmail(e.target.value)}} value={email} />   <br /> 
            <input type="password" required placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}} value={password}/> <br />
            <button className='doIt' disabled={load} type="submit">Login</button>
            {err && <div className='error'>{err}</div>}
        </form>
      </div>
    </div>
  )
}

export default Login