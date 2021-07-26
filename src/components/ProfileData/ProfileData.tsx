import React, { useState } from 'react';
import Titles from '../Titles/Titles';
import Bookshelf from '../Bookshelf/Bookshelf';
import ProfileReviews from '../ProfileReviews/ProfileReviews';
import './ProfileData.scss';

const ProfileData: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState('');

  return (
    <div className='profile-data-container'>
      <div className='profile-data-header'>
        <h3>Titles</h3>
        <h3>Bookshelf</h3>
        <h3>Reviews</h3>
      </div>
    </div>
  );
};

export default ProfileData;
