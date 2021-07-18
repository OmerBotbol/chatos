import React, { useState } from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';

function Signup({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [finished, setFinished] = useState(false);

  const signupWithEmailAndPassword = () => {
    axios.post('/api/user/create', { username, password, email }).then(() => {
      setFinished((prev) => !prev);
    });
  };

  return (
    <>
      {finished ? (
        <Redirect to="/" />
      ) : (
        <div>
          <label>email: </label>
          <input type="email" onChange={(e) => setEmail(e.target.value)} />
          <label>username: </label>
          <input type="text" onChange={(e) => setUsername(e.target.value)} />
          <label>password: </label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={() => signupWithEmailAndPassword()}>submit</button>
        </div>
      )}
    </>
  );
}

export default Signup;
