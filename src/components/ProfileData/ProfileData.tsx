import React from 'react';
import BookCard from '../BookCard/BookCard';
import './ProfileData.scss';

const ProfileData: React.FC = () => {
  return (
    <div className='profile-data-container'>
      <div className='profile-data-header'>
        <h3>Title</h3>
        <h3>Reviews</h3>
        <h3>Library</h3>
      </div>
      <BookCard />
      <BookCard />
      <BookCard />
      <BookCard />
      <BookCard />
      <BookCard />
    </div>
  );
};

export default ProfileData;
