import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import './UserDetails.scss';

const UserDetails: React.FC = () => {
  return (
    <div className='user-details-container'>
      <FaUserCircle />
      <h3>User's Name</h3>
      <button>Subscribe Button</button>
    </div>
  );
};

export default UserDetails;
