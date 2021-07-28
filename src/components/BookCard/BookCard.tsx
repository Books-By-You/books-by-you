import React from 'react';
import { Link } from 'react-router-dom';
import Rating from '../Rating/Rating';
import './BookCard.scss';
interface Ratings {
  _id: string;
  userId: string;
  rating: number;
}

interface Book {
  title: string;
  description?: string;
  image_url?: string;
  ratings: Ratings[];
  bookId?: number;
}

const BookCard: React.FC<Book> = (props) => {
  const { title, description, image_url, ratings = [], bookId } = props;
  const bookClass = description ? 'wide' : 'narrow';

  const bookRatingsArr =
    ratings.length > 0 ? ratings.map((rating: Ratings) => rating.rating) : [];

  const bookRating = bookRatingsArr.reduce(
    (total: number, rating: number): number => {
      return total + rating;
    },
    0
  );

  return (
    <div className={`book ${bookClass}`}>
      {description ? (
        <>
          <img src={image_url} alt={title} />
          <Rating value={bookRating} />
          <Link to={`/book/${bookId}`}>
            <p className="title">{title}</p>
          </Link>
          <p className="description">{description}</p>
        </>
      ) : (
        <>
          <img src={image_url} alt={title} />
          <Rating value={bookRating} />
          <Link to={`/book/${bookId}`}>
            <p className="title">{title}</p>
          </Link>
        </>
      )}
    </div>
  );
};

export default BookCard;
