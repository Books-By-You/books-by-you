import React from 'react';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';
import { IconContext } from 'react-icons';

const Rating: React.FC<{ value: number }> = ({ value }) => {
  return (
    <div className='rating'>
      <span>
        <IconContext.Provider value={{ color: '#FDCC0D' }}>
          {value >= 1 ? (
            <FaStar />
          ) : value >= 0.5 ? (
            <FaStarHalfAlt />
          ) : (
            <FaRegStar />
          )}
        </IconContext.Provider>
      </span>
      <span>
        <IconContext.Provider value={{ color: '#FDCC0D' }}>
          {value >= 2 ? (
            <FaStar />
          ) : value >= 1.5 ? (
            <FaStarHalfAlt />
          ) : (
            <FaRegStar />
          )}
        </IconContext.Provider>
      </span>
      <span>
        <IconContext.Provider value={{ color: '#FDCC0D' }}>
          {value >= 3 ? (
            <FaStar />
          ) : value >= 2.5 ? (
            <FaStarHalfAlt />
          ) : (
            <FaRegStar />
          )}
        </IconContext.Provider>
      </span>
      <span>
        <IconContext.Provider value={{ color: '#FDCC0D' }}>
          {value >= 4 ? (
            <FaStar />
          ) : value >= 3.5 ? (
            <FaStarHalfAlt />
          ) : (
            <FaRegStar />
          )}
        </IconContext.Provider>
      </span>
      <span>
        <IconContext.Provider value={{ color: '#FDCC0D' }}>
          {value >= 5 ? (
            <FaStar />
          ) : value >= 4.5 ? (
            <FaStarHalfAlt />
          ) : (
            <FaRegStar />
          )}
        </IconContext.Provider>
      </span>
    </div>
  );
};

export default Rating;
