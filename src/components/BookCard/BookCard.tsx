import React from 'react';
import './BookCard.scss';

interface Book {
  title: string;
  description?: string;
  image_url: string;
  rating: any;
}

const BookCard: React.FC<Book> = (props) => {
  const { title, description, image_url, rating } = props;
  const bookClass = description ? 'wide' : 'narrow';

  return (
    <div className={`book ${bookClass}`}>
      {description ? (
        <>
          <img src={image_url} alt={title} />
          <div className='rating'>{rating}</div>
          <p className='title'>{title}</p>
          <p className='description'>{description}</p>
        </>
      ) : (
        <>
          <img src={image_url} alt={title} />
          <div className='rating'>{rating}</div>
          <p className='title'>{title}</p>
        </>
      )}
    </div>
  );
};

// BookCard.defaultProps = defaultProps;

export default BookCard;
