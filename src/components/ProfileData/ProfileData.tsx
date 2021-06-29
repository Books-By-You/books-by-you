import React from 'react';
import './ProfileData.scss';

const ProfileData: React.FC = () => {
  return (
    <div className='profile-data-container'>
      <div className='profile-data-header'>
        <h3>Title</h3>
        <h3>Reviews</h3>
        <h3>Library</h3>
      </div>
    </div>
  );
};

export default ProfileData;
