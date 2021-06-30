import React from 'react';
import './BookCard.scss';

interface Book {
  title: string;
  description?: string;
  image_url: string;
  rating: any;
}

const BookCard: React.FC<Book> = ({
  title,
  description,
  image_url,
  rating,
}: Book) => {
  const bookClass = description ? 'narrow' : 'wide';
  if (description) {
  }
  return (
    <div className={`book ${bookClass}`}>
      <img src={image_url} alt={title} />
      <div className='rating'>{rating}</div>
      <p>{title}</p>
      {description && <p>{description}</p>}
    </div>
  );
};

export default BookCard;
