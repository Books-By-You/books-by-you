import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./BookCard.scss";

interface Book {
  title: string;
  description?: string;
<<<<<<< HEAD
  image_url: string;
  rating: any;
=======
  image_url?: string;
  rating?: any;
  bookId?: number;
>>>>>>> d95311608317c2bee812d3cbf7cf86d80be9ab5c
}

const BookCard: React.FC<Book> = (props) => {
  const { title, description, image_url, rating, bookId } = props;
  const bookClass = description ? "wide" : "narrow";

  return (
    <div className={`book ${bookClass}`}>
      {description ? (
        <>
          <img src={image_url} alt={title} />
          <div className="rating">{rating}</div>
          <Link to={`/book/${bookId}`}>
            <p className="title">{title}</p>
          </Link>
          <p className="description">{description}</p>
        </>
      ) : (
        <>
          <img src={image_url} alt={title} />
          <div className="rating">{rating}</div>
          <Link to={`/book/${bookId}`}>
            <p className="title">{title}</p>
          </Link>
        </>
      )}
    </div>
  );
};

export default BookCard;
