import React, { useState, useEffect } from 'react';
import BookCard from '../BookCard/BookCard';
import { connect } from 'react-redux';
import './ProfileData.scss';
import axios from 'axios';

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

const ProfileData: React.FC = () => {
  const defaultBooks: Book[] = [];
  const [books, setBooks]: [Book[], (books: Book[]) => void] =
    useState(defaultBooks);

  const getBooks = async () => {
    let booksArr: Book[] = await axios
      .get('/api/books')
      .then((response) => {
        return response.data;
      })
      .catch((err) => console.log(err));
    setBooks(booksArr);
  };

  useEffect(() => {
    getBooks();
  }, [books]);

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
        <h3>Titles</h3>
        <h3>Reviews</h3>
        <h3>Library</h3>
      </div>
      {books.length > 0 && booksList}
    </div>
  );
};

const mapStateToProps = (reduxState: any) => {
  return {
    books: reduxState.booksReducer,
  };
};

export default connect(mapStateToProps)(ProfileData);
