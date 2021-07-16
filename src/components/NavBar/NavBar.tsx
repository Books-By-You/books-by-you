import React, { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { BsBook } from 'react-icons/bs';
import Button from '../Button/Button';
import { connect } from 'react-redux';
import { logout } from '../../redux/reducers/userReducer';
import { Link, useHistory } from 'react-router-dom';
import './NavBar.scss';

interface User {
  userId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  profileImage: string;
}

const NavBar: React.FC<{ user: User; logout: () => void }> = ({
  user,
  logout,
}) => {
  const [toggleNavLinks, setToggleNavLinks] = useState(false);
  const history = useHistory();
  const bottomBorderSize = toggleNavLinks
    ? 'four-links-wide'
    : 'three-links-wide';

  useEffect(() => {
    const showLogout = () => {
      if (user.userId) {
        setToggleNavLinks(true);
      } else {
        setToggleNavLinks(false);
      }
    };

    showLogout();
  }, [user.userId]);

  const handleLogout = () => {
    logout();
    history.push('/');
  };

  return (
    <nav className='navbar'>
      <div className='book-icon'>
        <BsBook />
      </div>
      <div className='nav-link-container'>
        <div className='nav-links'>
          <Link to='/'>Home</Link>
          <Link to='/search'>Read</Link>
          {!user.userId && <Link to='/login'>Login</Link>}
          {user.userId && (
            <>
              <Link to={`/profile/${user.userId}`}>Profile</Link>
              <Button
                label='Logout'
                styleName='logout'
                handleClick={handleLogout}
              />
            </>
          )}
        </div>
        <div className={`gradient-bottom-border ${bottomBorderSize}`}></div>
      </div>
      <div className='user-profile-icon'>
        <FaUserCircle />
      </div>
    </nav>
  );
};

const mapStateToProps = (reduxState: any) => {
  return {
    user: reduxState.userReducer,
  };
};

const mapDispatchToProps = {
  logout: logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
