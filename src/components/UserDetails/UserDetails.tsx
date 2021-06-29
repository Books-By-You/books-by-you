import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import Button from '../../reusable-components/Button/Button';
import './UserDetails.scss';

const UserDetails: React.FC = () => {
  return (
    <div className='user-details-container'>
      <FaUserCircle />
      <h3>User's Name</h3>
      <Button />
    </div>
  );
};

export default UserDetails;
