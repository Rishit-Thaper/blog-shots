import React, { useState } from 'react'
import { useSignup } from '../hooks/useSignup';


function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {handleSignup, loading, error} = useSignup()
    const handleSubmit = async (e:any) =>{
      
      e.preventDefault();

      await handleSignup(name, email, password)
      console.log(email, password);
  }
  return (
    <div className='account'>
      <div className="intro">

        <h1 id='hidden'>Do Did Done!!!</h1>
        <h1>Do <br />Did <br /> Done!!!</h1>
        <h2>Create a new Account and start doing</h2>
      </div>
      <div className="form-div">
        <form onSubmit={handleSubmit}>
            <input type="text" required onChange={(e)=>{setName(e.target.value)}} placeholder='Name' value={name}/> <br />
            <input type="email" required placeholder='Email'onChange={(e)=>{setEmail(e.target.value)}} value={email} />   <br /> 
            <input type="password" required placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}} value={password}/> <br />
            <button className='doIt' disabled={loading} type="submit">Register</button>
            {error && <div className='error'>{error.message}</div>}
        </form>
      </div>
    </div>
  )
}

export default SignUp