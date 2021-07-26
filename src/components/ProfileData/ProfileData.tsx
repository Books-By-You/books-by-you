import React, { useState } from 'react';
import Titles from '../Titles/Titles';
import Bookshelf from '../Bookshelf/Bookshelf';
import ProfileReviews from '../ProfileReviews/ProfileReviews';
import Button from '../Button/Button';
import './ProfileData.scss';

const ProfileData: React.FC = () => {
  const [view, setView] = useState('');

  const handleClick = (e: any) => {
    setView(e.target.innerText);
  };

  return (
    <div className='profile-data-container'>
      <div className='profile-data-header'>
        <Button
          styleName={''}
          label={'Titles'}
          handleClick={(e: any) => handleClick(e)}
        />
        <Button
          styleName={''}
          label={'Bookshelf'}
          handleClick={(e: any) => handleClick(e)}
        />
        <Button
          styleName={''}
          label={'Reviews'}
          handleClick={(e: any) => handleClick(e)}
        />
      </div>
      <div>
        {view === 'Titles ' ? (
          <Titles />
        ) : view === 'Bookshelf' ? (
          <Bookshelf />
        ) : view === 'Reviews' ? (
          <ProfileReviews />
        ) : (
          <Titles />
        )}
      </div>
    </div>
  );
};

export default ProfileData;
