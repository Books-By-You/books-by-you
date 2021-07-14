import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { connect } from 'react-redux';
import './UserDetails.scss';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

const UserDetails: React.FC<{ user: User }> = ({
  user = {
    id: '1',
    name: 'John Doe',
    email: 'john@test.com',
    avatar: 'https://avatars3.githubusercontent.com/u/1234?v=3&s=200',
  },
}) => {
  const location = useLocation();

  console.log(user);

  return (
    <div className='user-details-container'>
      {user.avatar ? (
        <img src={user.avatar} alt={`pic of ${user.name}`} />
      ) : (
        <FaUserCircle />
      )}
      <h3>{user.name}</h3>
      {user.id !== location.pathname.split('/')[2] && (
        <button>Subscribe</button>
      )}
    </div>
  );
};

const mapStateToProps = (reduxState: any) => {
  return {
    user: reduxState.userReducer.user,
  };
};

export default connect(mapStateToProps)(UserDetails);
