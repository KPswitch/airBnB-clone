import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './SignupForm.css'
import * as sessionActions from "../../store/session";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  useEffect(() => {
    setIsButtonDisabled(
      !username || !email || !password || !confirmPassword ||
      username.length < 4 || password.length < 6 || password !== confirmPassword
    );
  }, [username, email, password, confirmPassword]);

  // const openMenu = () => {

  //   if (showMenu || isLoginModalOpen || isSignUpModalOpen) return;
  //   setShowMenu(true);
  // };

  // const handleSignUpModalOpen = () => {
  //   setIsSignUpModalOpen(true);
  // };

  // const handleSignUpModalClose = () => {
  //   setIsSignUpModalOpen(false);
  // };

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
      //.then(()=>onClose())
      .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleModalClose = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setIsButtonDisabled(true);
    setErrors([]);

  };

  return (
    <div>
      <div classname="overlay">
      <div className='signup-box'>


    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label>
        Email
        <input
          type="text"
          value={email}
          placeholder="Email"
          onChange={handleEmailChange}
          required
          />
      </label>
      <label>
        Username
        <input
          type="text"
          value={username}
          placeholder="UserName"
          onChange={handleUsernameChange}
          required
          />
      </label>
      <label>
        First Name
        <input
          type="text"
          value={firstName}
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value)}
          required
          />
      </label>
      <label>
        Last Name
        <input
          type="text"
          value={lastName}
          placeholder="Last Name"
          onChange={(e) => setLastName(e.target.value)}
          required
          />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          placeholder="password"
          onChange={handlePasswordChange}
          required
          />
      </label>
      <label>
        Confirm Password
        <input
          type="password"
          value={confirmPassword}
          placeholder="confirm password"
          onChange={handleConfirmPasswordChange}
          required
          />
      </label>
      <button type="submit" disabled={isButtonDisabled}>Sign Up</button>
      <button type="button" onClick={handleModalClose}>Cancel</button>
    </form>
    </div>
    </div>
          </div>
  );
}

export default SignupFormPage;
