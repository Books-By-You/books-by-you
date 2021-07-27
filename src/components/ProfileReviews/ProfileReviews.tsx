import React, { useState } from 'react';
import Loading from '../Loading/Loading';
import './ProfileReviews.scss';

const ProfileReviews: React.FC = () => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <h1>Waiting for reviews controller to be complete</h1>
        </>
      )}
    </>
  );
};

export default ProfileReviews;
