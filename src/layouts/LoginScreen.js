import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import './LoginStyles.scss'
import { setTextRange } from 'typescript';

export default function LoginScreen() {
  const [username, setUsername] = useState('user1');
  const [password, setPassword] = useState('');

  const user = useSelector( state => state.user);
  const dispatch = useDispatch();

  let history = useHistory();
  
  function onClickLogin () {
    const data = JSON.stringify({username: username, password: password});
    fetch('http://localhost:3001/login/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: data
    })
      .then(res => res.json())
      .then(resJSON => {
        dispatch({
          type: 'SET_CURRENT_USER',
          payload: resJSON.da
        });
        history.replace('/home', resJSON.da.id);
      })
      .catch(err => {console.log(err)})
  } 

  return (
    <div className="body text-center">
      <div className="form-signin">
        <img className="mb-4" src={require('../assets/user.png')} width="72" height="72" />
        <h1 className="h3 mb-3 font-weight-normal">Нэвтрэх</h1>
        <label htmlFor="emailinput" className="sr-only">Хэрэглэгчийн нэр</label>
        <input 
          value={username}
          onChange={value => {setUsername(value.target.value)}}
          type="email" 
          id="emailinput" 
          className="form-control" 
          placeholder="И-мэйл" 
          required 
          autoFocus 
        />
        <label htmlFor="passwordinput" className="sr-only">Хэрэглэгчийн нэр</label>
        <input 
          value={password}
          onChange={value => {setPassword(value.target.value)}}
          type="password" 
          id="passwordinput" 
          className="form-control" 
          placeholder="Нууц үг" 
          required 
          autoFocus
        />
        <div className="checkbox md-3">
          <label>
            <input type="checkbox" value="remember=me" />
                        Намайг сана
                    </label>
        </div>
        <button onClick={onClickLogin} className="btn btn-lg btn-primary btn-block" type="submit">Нэвтрэх</button>
        <p className="mt-5 mb-3 text-muted">&copy; 2020</p>
      </div>
    </div>
  );
} 