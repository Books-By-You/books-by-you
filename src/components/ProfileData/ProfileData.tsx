import React from "react";
import BookCard from "../BookCard/BookCard";
import { SliderData } from "../searchView/SliderData";
import { connect } from "react-redux";
import "./ProfileData.scss";

interface Book {
  bookId: string;
  title: string;
  authorId: string;
  description: string;
  coverImage: string;
  tags: string[];
  chapters: string[];
  isPublished: boolean;
}

const ProfileData: React.FC<{ books: Book }> = ({ books }) => {
  const bookList = SliderData.map((book) => (
    <BookCard
      title={book.title}
      description={book.description}
      image_url={book.image}
      ratings={book.rating}
    />
  ));

  return (
    <div className="profile-data-container">
      <div className="profile-data-header">
        <h3>Titles</h3>
        <h3>Reviews</h3>
        <h3>Library</h3>
      </div>
      {bookList}
    </div>
  );
};

const mapStateToProps = (reduxState: any) => {
  return {
    books: reduxState.booksReducer,
  };
};

export default connect(mapStateToProps)(ProfileData);
