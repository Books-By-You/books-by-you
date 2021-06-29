import React from 'react';
import UserDetails from '../UserDetails/UserDetails';
import ProfileData from '../ProfileData/ProfileData';
import './ProfileView.scss';

const ProfileView: React.FC = () => {
  return (
    <div className='profile-container'>
      <section className='user-details'>
        <UserDetails />
      </section>
      <main className='profile-data'>
        <ProfileData />
      </main>
    </div>
  );
};

export default ProfileView;
