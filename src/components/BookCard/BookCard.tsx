import { fireEvent } from "@testing-library/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Rating from "../Rating/Rating";
import "./BookCard.scss";

interface Book {
  title: string;
  description?: string;
  image_url?: string;
  ratings?: any;
  bookId?: number;
}

const BookCard: React.FC<Book> = (props) => {
  const { title, description, image_url, ratings, bookId } = props;
  const bookClass = description ? "wide" : "narrow";
  let finalRating: any = 0;
  if (!ratings) {
    finalRating = 0;
  } else {
    let ratingSum = 0;
    let totalRatings = 0;
    for (let i = 0; i < ratings.length; i++) {
      ratingSum += ratings[i].rating;
      totalRatings += 1;
    }
    finalRating = ratingSum / totalRatings;
  }

  console.log({ ratings });
  return (
    <div className={`book ${bookClass}`}>
      {description ? (
        <>
          <img src={image_url} alt={title} />
          <Rating value={finalRating} />
          <Link to={`/book/${bookId}`}>
            <p className="title">{title}</p>
          </Link>
          <p className="description">{description}</p>
        </>
      ) : (
        <>
          <img src={image_url} alt={title} />
          <Rating value={finalRating} />
          <Link to={`/book/${bookId}`}>
            <p className="title">{title}</p>
          </Link>
        </>
      )}
    </div>
  );
};

export default BookCard;
