import React, { useState, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import axios from 'axios';
import Button from '../Button/Button';
import './UserDetails.scss';

interface User {
  userId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  profileImage: string;
}

const UserDetails: React.FC<{ userLoggedIn: User; openSettings: () => void }> =
  ({ userLoggedIn, openSettings }) => {
    const location = useLocation();
    const history = useHistory();
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

    const redirectToPublish = () => {
      history.push('/publishing');
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
            <h3>{user.username}</h3>
            {user.userId && user.userId === location.pathname.split('/')[2] && (
              <div className='user-details-buttons'>
                <Button
                  label='Settings'
                  styleName='settings'
                  handleClick={openSettings}
                />
                <Button
                  label='Publish'
                  styleName='publish'
                  handleClick={redirectToPublish}
                />
              </div>
            )}
          </>
        ) : (
          <div>User not found</div>
        )}
      </div>
    );
  };

const mapStateToProps = (reduxState: any): { userLoggedIn: User } => {
  return {
    userLoggedIn: reduxState.userReducer,
  };
};

export default connect(mapStateToProps)(UserDetails);
