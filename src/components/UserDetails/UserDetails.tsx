import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
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

  console.log(user);

  return (
    <div className='user-details-container'>
      {user.profileImage ? (
        <img src={user.profileImage} alt={`pic of ${user.firstName}`} />
      ) : (
        <FaUserCircle />
      )}
      <h3>{user.firstName}</h3>
      {user.userId !== location.pathname.split('/')[2] && (
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
