import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import Loading from '../Loading/Loading';
import BookCard from '../BookCard/BookCard';
import axios from 'axios';
import './Bookshelf.scss';

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

const Bookshelf: React.FC = () => {
  const location = useLocation();
  const defaultBooks: Book[] = [];
  const [loading, setLoading] = useState(true);
  const [bookshelf, setBookshelf]: [Book[], (bookshelf: Book[]) => void] =
    useState(defaultBooks);
  const [booksList, setBooksList] = useState<any>([]);
  const [bookshelfErrorMessage, setBookshelfErrorMessage] = useState(
    'This user has no books to display.'
  );
  const userIdFromPath = location.pathname.split('/')[2];

  useEffect(() => {
    console.log('first useEffect');
    let books: Book[] = [];
    axios
      .get(`/api/bookshelf/${userIdFromPath}`)
      .then(({ data }) => {
        return data;
      })
      .then((bookIds) => {
        bookIds.forEach((bookId: any) => {
          axios.get(`/api/book/${bookId}`).then(({ data }) => {
            books.push(data);
          });
        });
      })
      .then(() => {
        setBookshelf(books);
      })
      .catch((error) => {
        setLoading(false);
        setBookshelfErrorMessage('Unable to find books.');
      });

    if (booksList.length > 0) {
      const booksArr = bookshelf.map((book: Book) => (
        <span key={book._id}>
          <BookCard
            title={book.title}
            description={book.description}
            image_url={book.coverImage}
            ratings={book.ratings}
          />
        </span>
      ));
      setBooksList(booksArr);
      setLoading(false);
    }
  }, [booksList, bookshelf, userIdFromPath]);

  // useEffect(() => {
  //   console.log('second useEffect', booksList);

  // }, [booksList, bookshelf]);

  return <>{loading ? <Loading /> : <>{booksList && booksList}</>}</>;
};

export default Bookshelf;
