import React, { useState, useEffect } from 'react';
import { Link, Redirect, useLocation } from "react-router-dom";
import "./nav-bar-component-style.css";
import { useHistory } from "react-router-dom";



const LoggedInNavbar = ({ username }) => {


  const [loggedOut, setLoggedOut] = useState(false);

  let history = useHistory();

  const userSettings = () => {
    history.push('/Profile');
  }

  const logout = () => {
    localStorage.removeItem('user');
    setLoggedOut(true);
  }


  return (
    <>
      {
        loggedOut ? <Redirect to='/login' /> :
          <>
            <span className='navbar-hello-username' onClick={userSettings}>{`Hello, ${username}`}</span>
            <button className='header-button-styleless' onClick={logout} >Log out</button>
          </>

      }
    </>
  );
}

const LoggedOutNavbar = () => {

  return (
    <>
      <Link to="/login" className='header-button-styleless'>Log in</Link>
      <Link to="/register" className='header-button-styleless'>Register</Link>
    </>
  );
}

const NavBar = () => {

  const [user, setUser] = useState('');
  const location = useLocation();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')))
  }, [location]);

  return (
    <div className="header">
      <Link to='/' className="logo">Auctions</Link>
      <div className="header-right">
        {user == null ?
          <LoggedOutNavbar />
          :
          <LoggedInNavbar username={user['user']} />
        }
      </div>
    </div>
  );
}

export default NavBar;
