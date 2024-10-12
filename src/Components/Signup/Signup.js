import React, { useState } from 'react';

import logo from '../../olx-logo.png';
import './Signup.css';
import { signUp } from '../../firebase';
import { useNavigate } from 'react-router-dom';

export default function Signup() {

  let [userName, setUserName] = useState('')
  let [email, setEmail] = useState('')
  let [phone, setPhone] = useState('')
  let [password, setPassword] = useState('')

  let navigate = useNavigate()

  let user_auth = async (e) => {
    e.preventDefault();
    await signUp(userName, email, phone, password)
    navigate('/')
  }



  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={logo}></img>
        <form>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="lname"
            name="phone"
            defaultValue="Doe"
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
          <button onClick={user_auth} type='submit'>Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
