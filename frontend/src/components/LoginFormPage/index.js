import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (sessionUser) return (
    <Redirect to="/" />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'credential') {
      setCredential(value);
    } else {
      setPassword(value);
    }
    setIsButtonDisabled(value.length < 6 || credential.length < 4);
  };

  const handleDemoUserLogin = () => {
    dispatch(sessionActions.login({
      credential: 'demo@user.io',
      password: 'password'
    }));
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (isModalOpen && !event.target.closest('.login-box')) {
  //       setIsModalOpen(false);
  //     }
  //   };
  //   document.addEventListener('click', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('click', handleClickOutside);
  //   };
  // }, [isModalOpen]);

  return (
    <div>




      <div className='overlay'>
      <div className='login-box'>

    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label>
        Username or Email
        <input
          type="text"
          name="credential"
          value={credential}
          onChange={handleInputChange}
          required
          />
      </label>
      <label>
        Password
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleInputChange}
          required
          />
      </label>
      <button type="submit" disabled={isButtonDisabled}>Log In</button>
      <button type="button" onClick={handleDemoUserLogin}>Log in as Demo User</button>
    </form>
    </div>
    </div>

          </div>
  );
}

export default LoginFormPage;
