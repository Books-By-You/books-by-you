import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import axios from 'axios';
import BookCard from '../BookCard/BookCard';
import Loading from '../Loading/Loading';
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const source = axios.CancelToken.source();
    setLoading(true);

    const getBooks = async () => {
      try {
        await axios
          .get(`/api/booksbyauthor/${userIdFromPath}`, {
            cancelToken: source.token,
          })
          .then(({ data }) => {
            setLoading(false);
            setBooks(data);
          });
      } catch (error) {
        if (axios.isCancel(error)) {
        } else {
          setLoading(false);
          setBookshelfErrorMessage('Unable to find books.');
          throw error;
        }
      }
    };

    getBooks();

    return () => {
      source.cancel();
    };
  }, [userIdFromPath]);

  const bookList = books.map((book: Book) => (
    <span key={book._id}>
      <BookCard
        bookId={book._id}
        title={book.title}
        description={book.description}
        image_url={book.coverImage}
        ratings={book.ratings}
      />
    </span>
  ));

  return (
    <>
      {loading ? (
        <Loading />
      ) : bookList.length > 0 ? (
        bookList
      ) : (
        <>{bookshelfErrorMessage}</>
      )}
    </>
  );
};

export default Titles;
