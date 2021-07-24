import React, { useState, useEffect } from 'react';
import BookCard from '../BookCard/BookCard';
import { connect } from 'react-redux';
import './ProfileData.scss';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

interface Book {
  _id: string;
  title: string;
  authorId: string;
  description: string;
  coverImage: string;
  tags: string[];
  chapters: string[];
  ratings: [];
  isPublished: boolean;
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
  const [bookshelfErrorMessage, setBookshelfErrorMessage] = useState('');
  const userId = location.pathname.split('/')[2];

  useEffect(() => {
    axios
      .get(`/api/bookshelf/${userId}`)
      .then((response) => {
        setBooks(response.data);
      })
      .catch((err) => {
        console.log(err);
        setBookshelfErrorMessage('There are no books to display.');
      });
  }, [userId]);

  const booksList = books.map((book) => {
    return (
      <span key={book._id}>
        <BookCard
          title={book.title}
          description={book.description}
          image_url={book.coverImage}
          ratings={book.ratings}
        />
      </span>
    );
  });

  return (
    <div className='profile-data-container'>
      <div className='profile-data-header'>
        <h3>Library</h3>
        <h3>Reviews</h3>
      </div>
      {books.length > 0 ? booksList : <div>{bookshelfErrorMessage}</div>}
    </div>
  );
};

const mapStateToProps = (reduxState: any) => {
  return {
    user: reduxState.userReducer,
  };
};

export default connect(mapStateToProps)(ProfileData);
