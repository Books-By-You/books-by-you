import React, { useState, useLayoutEffect } from "react";
import { connect } from "react-redux";
import { Props } from "../auth/authInterface";
import axios, { AxiosResponse } from "axios";
import "./BookView.scss";

const BookView: React.FC<Props> = (props) => {
  const [bookId, setBookId] = useState(props.match.params.id);
  const [book, setBook] = useState({
    title: "",
    genre: "",
    rating: 0,
    author: "",
    desc: "",
    coverImg: "",
    chapters: [],
  });

  function getBookInfo() {
    axios
      .get(`/api/book/:${bookId}`)
      .then((res) => {
        setBook(res.data);
      })
      .catch((err) => err);
  }

  useLayoutEffect(() => {
    getBookInfo();
  }, []);
  let displayComponent = "im a description";
  return (
    <div className="book-container">
      <section id="book-info-container">
        <img
          id="cover-image-size"
          src="https://images-na.ssl-images-amazon.com/images/I/91KzZWpgmyL.jpg"
        ></img>
        <section>
          <p>{`${book.title}`}</p>
          <p>{`${book.genre}`}</p>
          <button>Add to Library</button>
          {
            //<Rating/>
          }
        </section>
      </section>
      <section>
        <button>Description</button>
        <button>Chapters</button>
        <button>Reviews</button>
      </section>
      <section>{displayComponent}</section>
    </div>
  );
};
const mapStateToProps = (state: any) => state;
export default connect(mapStateToProps, null)(BookView);
