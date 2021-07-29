import React from 'react';
import './Loading.scss';

const Loading: React.FC = () => {
  return (
    <div className='lds-ring'>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loading;
