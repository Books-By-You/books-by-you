import React, { useState } from 'react';
import UserDetails from '../UserDetails/UserDetails';
import ProfileData from '../ProfileData/ProfileData';
import ProfileSettings from '../ProfileSettings/ProfileSettings';
import './ProfileView.scss';

const ProfileView: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);

  const openSettings = () => {
    setOpenModal(true);
  };

  const closeSettings = () => {
    setOpenModal(false);
  };

  return (
    <div className='profile-container'>
      <section className='user-details'>
        <UserDetails openSettings={openSettings} />
      </section>
      <section className='profile-data'>
        <ProfileData />
      </section>
      {openModal && (
        <ProfileSettings handleClose={closeSettings} open={openModal} />
      )}
    </div>
  );
};

export default ProfileView;
