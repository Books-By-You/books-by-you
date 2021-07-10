import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import './UserDetails.scss';

const UserDetails: React.FC = () => {
  const location = useLocation();
  // dummy data until we get real data
  const user = {
    id: '1',
    name: 'John Doe',
    email: 'john@test.com',
    avatar: 'https://avatars3.githubusercontent.com/u/1234?v=3&s=200',
  };

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

export default UserDetails;
