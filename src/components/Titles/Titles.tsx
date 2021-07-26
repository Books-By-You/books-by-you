import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import axios from 'axios';
import BookCard from '../BookCard/BookCard';
import './Titles.scss';

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

const Titles: React.FC = () => {
  const location = useLocation();
  const defaultBooks: Book[] = [];
  const [books, setBooks]: [Book[], (books: Book[]) => void] =
    useState(defaultBooks);
  const [bookshelfErrorMessage, setBookshelfErrorMessage] = useState(
    'This user has no books to display.'
  );
  const userIdFromPath = location.pathname.split('/')[2];

  useEffect(() => {
    const source = axios.CancelToken.source();

    const getBooks = async () => {
      try {
        await axios
          .get(`/api/booksbyauthor/${userIdFromPath}`, {
            cancelToken: source.token,
          })
          .then(({ data }) => {
            console.log('data received');
            setBooks(data);
          });
      } catch (error) {
        if (axios.isCancel(error)) {
        } else {
          setBookshelfErrorMessage('Unable to find books.');
          throw error;
        }
      }
    };

    getBooks();

    return () => {
      console.log('request cancelled');
      source.cancel();
    };
  }, [userIdFromPath]);

  const bookList = books.map((book: Book) => (
    <span key={book._id}>
      <BookCard
        title={book.title}
        description={book.description}
        image_url={book.coverImage}
        ratings={book.ratings}
      />
    </span>
  ));

  return <>{bookList.length > 0 ? bookList : <>{bookshelfErrorMessage}</>}</>;
};

export default Titles;
