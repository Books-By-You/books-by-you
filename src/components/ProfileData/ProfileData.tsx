import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import BookCard from '../BookCard/BookCard';
import axios from 'axios';
import './ProfileData.scss';

interface Book {
  _id: string;
  title: string;
  authorID?: string;
  description?: string;
  coverImage?: string;
  tags?: string[];
  chapters?: string[];
  ratings: [];
  isPublished?: boolean;
}

const ProfileData: React.FC = () => {
  const location = useLocation();
  const defaultBooks: Book[] = [];
  const [books, setBooks]: [Book[], (books: Book[]) => void] =
    useState(defaultBooks);
  const [bookshelfErrorMessage, setBookshelfErrorMessage] = useState(
    'This user has no books to display.'
  );
  const userIdFromPath = location.pathname.split('/')[2];

  const getBooks = useCallback(async () => {
    await axios
      .get<Book[]>(`/api/books`)
      .then(({ data }) => {
        setBooks(data);
      })
      .catch((err) => {
        console.log(err);
        setBookshelfErrorMessage('Unable to find books for this user.');
      });
  }, []);

  useEffect(() => {
    getBooks();
  }, [getBooks]);

  const filteredBooksById = books
    .filter((book) => {
      return book.authorID === userIdFromPath;
    })
    .map((book: any) => (
      <span key={book._id}>
        <BookCard
          title={book.title}
          description={book.description}
          image_url={book.coverImage}
          ratings={book.ratings}
        />
      </span>
    ));

  return (
    <div className='profile-data-container'>
      <div className='profile-data-header'>
        <h3>Titles</h3>
        <h3>Bookshelf</h3>
        <h3>Reviews</h3>
      </div>
      {filteredBooksById.length > 0 ? (
        filteredBooksById
      ) : (
        <div>{bookshelfErrorMessage}</div>
      )}
    </div>
  );
};

export default ProfileData;
