import React, { useState, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import './UserDetails.scss';

interface User {
  userId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  profileImage: string;
}

const UserDetails: React.FC<{ userLoggedIn: User }> = ({ userLoggedIn }) => {
  const location = useLocation();
  const [user, setUser] = useState<User>();
  const userIdFromPath = location.pathname.split('/')[2];

  useLayoutEffect(() => {
    if (userLoggedIn) {
      setUser(userLoggedIn);
    } else {
      axios
        .get(`/api/users/${userIdFromPath}`)
        .then(({ data }) => setUser(data))
        .catch((err) => console.log(err));
    }
  }, [userIdFromPath, userLoggedIn]);

  const addDefaultSrc = (e: any) => {
    e.target.src =
      'https://techpowerusa.com/wp-content/uploads/2017/06/default-user.png';
  };

  return (
    <div className='user-details-container'>
      {user ? (
        <>
          <img
            onError={addDefaultSrc}
            src={user.profileImage}
            alt={`pic of ${user.firstName}`}
          />
          <h3>{user.firstName}</h3>
          {user.userId && user.userId !== location.pathname.split('/')[2] && (
            <button>Subscribe</button>
          )}
        </>
      ) : (
        <div>User not found</div>
      )}
    </div>
  );
};

const mapStateToProps = (reduxState: any) => {
  return {
    userLoggedIn: reduxState.userReducer,
  };
};

export default connect(mapStateToProps)(UserDetails);
