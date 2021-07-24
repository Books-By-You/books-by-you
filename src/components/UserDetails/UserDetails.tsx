import React from 'react';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import './UserDetails.scss';

interface User {
  userId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  profileImage: string;
}

const UserDetails: React.FC<{ user: User }> = ({ user }) => {
  const location = useLocation();

  const addDefaultSrc = (e: any) => {
    e.target.src =
      'https://techpowerusa.com/wp-content/uploads/2017/06/default-user.png';
  };

  return (
    <div className='user-details-container'>
      <img
        onError={addDefaultSrc}
        src={user.profileImage}
        alt={`pic of ${user.firstName}`}
      />
      <h3>{user.firstName}</h3>
      {user.userId && user.userId !== location.pathname.split('/')[2] && (
        <button>Subscribe</button>
      )}
    </div>
  );
};

const mapStateToProps = (reduxState: any) => {
  return {
    user: reduxState.userReducer,
  };
};

export default connect(mapStateToProps)(UserDetails);
