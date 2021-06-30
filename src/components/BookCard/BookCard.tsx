import React from 'react';
import './BookCard.scss';

interface Book {
  title?: string;
  description?: string;
  image_url?: string;
  rating?: any;
}

const defaultProps: Book = {
  title: 'The Alchemist',
  // description:
  // 'The Alchemist is the magical story of Santiago, an Andalusian shepherd boy who yearns to travel in search of a worldly treasure as extravagant as any ever found. From his home in Spain he journeys to the markets of Tangiers and across the Egyptian desert to a fateful encounter with the alchemist.',
  image_url:
    'https://images-na.ssl-images-amazon.com/images/I/41ybG235TcL._SX329_BO1,204,203,200_.jpg',
  rating: 4.5,
};

const BookCard: React.FC<Book> = (props) => {
  const { title, description, image_url, rating } = props;
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

BookCard.defaultProps = defaultProps;

export default BookCard;
