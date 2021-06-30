import React, { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { BsBook } from 'react-icons/bs';
import './navBar.scss';

const NavBar: React.FC = () => {
  const [toggleNavLinks, setToggleNavLinks] = useState(false);
  const bottomBorderSize = toggleNavLinks
    ? 'four-links-wide'
    : 'three-links-wide';

  // temporary variable until redux implemented
  const loggedIn = false;

  useEffect(() => {
    const showLogout = () => {
      if (loggedIn) {
        setToggleNavLinks(true);
      } else {
        setToggleNavLinks(false);
      }
    };

    showLogout();
  }, [loggedIn]);

  return (
    <nav className='navbar'>
      <div className='book-icon'>
        <BsBook />
      </div>
      <div className='nav-link-container'>
        <ul className='nav-links'>
          <li>
            <a href='#'>Home</a>
          </li>
          <li>
            <a href='#'>Read</a>
          </li>
          {!loggedIn && (
            <li>
              <a href='#/login'>Login</a>
            </li>
          )}
          {loggedIn && (
            <>
              <li>
                <a href='#'>Account</a>
              </li>
              <li>
                <a href='#'>Logout</a>
              </li>
            </>
          )}
        </ul>
        <div className={`gradient-bottom-border ${bottomBorderSize}`}></div>
      </div>
      <div className='user-profile-icon'>
        <FaUserCircle />
      </div>
    </nav>
  );
};

export default NavBar;
