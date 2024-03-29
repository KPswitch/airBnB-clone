import React, {useState, useEffect, useRef} from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch,  } from 'react-redux';
import ProfileButton from './ProfileButton';
import SignupFormPage from '../SignUpFormPage';
import airbnbLogo from '../Logo/airbnblogo.png'

import './Navigation.css';

function Navigation({ isLoaded }){
  const [showMenu, setShowMenu] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const ulRef = useRef();
  const dispatch = useDispatch();



    const openMenu = () => {
      if (showMenu) return;
      setShowMenu(true);
    };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");


  const sessionUser = useSelector(state => state.session.user);

  const closeSignupForm = () => {
    setShowSignupForm(false);
  };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (

      <div className='profile-buttons'>

      <div className='profile-button create-spot-button'>

        <NavLink to="/spots/new">Create New Spot</NavLink>
      </div>
      <div className='profile-button'>

        <ProfileButton user={sessionUser} />
      </div>
      </div>

    );
  } else {
    sessionLinks = (
      <>
      <div className='profile-buttons'>

      <button onClick={openMenu}>
      <i className="fa-solid fa-user" />
    </button>
      </div>
    <ul className={ulClassName} ref={ulRef}>
      <li>
        <NavLink to="/login">Log In </NavLink>
      </li>
        <li>

        <NavLink to="/signup">Sign Up</NavLink>
        </li>
      </ul>
      </>
    );
  }

  return (
    <header className = 'page-header'>

    <ul>
        <NavLink className = 'home-link' exact to="/">
          <img src={airbnbLogo} alt='Home' className='home-image' />
          Airbnb
        </NavLink>
      {isLoaded && sessionLinks}
    </ul>
    <hr />
    </header>
  );
}

export default Navigation;
