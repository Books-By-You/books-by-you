import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Rating from '../Rating/Rating';
import './BookCard.scss';

interface Book {
  title: string;
  description?: string;
  image_url?: string;
  rating?: any;
  bookId?: number;
}

const BookCard: React.FC<Book> = (props) => {
  const { title, description, image_url, rating, bookId } = props;
  const bookClass = description ? 'wide' : 'narrow';

  return (
    <div className={`book ${bookClass}`}>
      {description ? (
        <>
          <img src={image_url} alt={title} />
          <Rating value={rating} />
          <Link to={`/book/${bookId}`}>
            <p className='title'>{title}</p>
          </Link>
          <p className='description'>{description}</p>
        </>
      ) : (
        <>
          <img src={image_url} alt={title} />
          <Rating value={rating} />
          <Link to={`/book/${bookId}`}>
            <p className='title'>{title}</p>
          </Link>
        </>
      )}
    </div>
  );
};

export default BookCard;
