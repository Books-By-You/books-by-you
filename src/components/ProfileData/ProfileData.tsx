import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
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

// interface User {
//   userId: string;
//   firstName: string;
//   lastName: string;
//   username: string;
//   email: string;
//   profileImage: string;
// }

// const ProfileData: React.FC<{ user: User }> = ({ user }) => {
const ProfileData: React.FC = () => {
  const location = useLocation();
  const defaultBooks: Book[] = [];
  const [books, setBooks]: [Book[], (books: Book[]) => void] =
    useState(defaultBooks);
  const [bookshelfErrorMessage, setBookshelfErrorMessage] = useState(
    'This user has no books to display.'
  );
  const userIdFromPath = location.pathname.split('/')[2];

  useEffect(() => {
    axios
      .get(`/api/books`)
      .then((response) => {
        setBooks(response.data);
      })
      .catch((err) => {
        console.log(err);
        setBookshelfErrorMessage('Unable to find books for this user.');
      });
  }, [userIdFromPath]);

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

const mapStateToProps = (reduxState: any) => {
  return {
    user: reduxState.userReducer,
  };
};

export default connect(mapStateToProps)(ProfileData);
