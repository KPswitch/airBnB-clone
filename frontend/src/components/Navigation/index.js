import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import airbnbLogo from '../Logo/airbnblogo.png'

import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (


      <div className='profile-button'>
        <ProfileButton user={sessionUser} />
      </div>

    );
  } else {
    sessionLinks = (
      <div className='navbar'>
      <li>
        <NavLink to="/login">Log In </NavLink>
        <li>
        <NavLink to="/signup">Sign Up</NavLink>
        </li>
      </li>
      </div>
    );
  }

  return (
    <ul>

        <NavLink exact to="/">
          <img src={airbnbLogo} alt='Home' className='home-image' />
          Rarebnb




        </NavLink>

      {isLoaded && sessionLinks}
    </ul>
  );
}

export default Navigation;
