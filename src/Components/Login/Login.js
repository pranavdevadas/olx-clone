import React, { useState } from 'react';

import Logo from '../../olx-logo.png';
import './Login.css';
import { login } from '../../firebase';
import { useNavigate } from 'react-router-dom';

function Login() {

  let [email, setEmail] = useState('')
  let [password, setPassword] = useState('')

  let navigate = useNavigate()

  let user_auth = async (e) => {
    try {
      
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
      await login(email, password);
      navigate('/')
    } catch(err) {
      console.log(err);
      alert(err)
    }
    
  }

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button  onClick={user_auth} type='submit'>Login</button>
        </form>
        <a onClick={() => navigate('/signup')} >Signup</a>
      </div>
    </div>
  );
}

export default Login;
