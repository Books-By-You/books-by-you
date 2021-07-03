import React from 'react';
import BookCard from '../BookCard/BookCard';
import { SliderData } from '../searchView/SliderData';
import './ProfileData.scss';

const ProfileData: React.FC = () => {
  const bookList = SliderData.map((book) => (
    <BookCard
      title={book.title}
      description={book.description}
      image_url={book.image}
      rating={book.rating}
    />
  ));

  return (
    <div className='profile-data-container'>
      <div className='profile-data-header'>
        <h3>Title</h3>
        <h3>Reviews</h3>
        <h3>Library</h3>
      </div>
      {bookList}
    </div>
  );
};

export default ProfileData;
