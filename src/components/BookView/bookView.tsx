import React, { useState, useLayoutEffect, useEffect } from "react";
import { connect } from "react-redux";
import { Props } from "../auth/authInterface";
import axios, { AxiosResponse } from "axios";
import ReviewCard from "../ReviewCard/ReviewCard";
import MappedChapters from "./MappedChapters";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import "./BookView.scss";

const BookView: React.FC<Props> = (props) => {
  const [bookId, setBookId] = useState(props.match.params.id);
  const [isLoading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [book, setBook] = useState({
    _id: "",
    title: "",
    tags: [],
    rating: 0,
    authorID: "",
    description: "",
    coverImage: "",
    chapters: [],
  });
  const [author, setAuthor] = useState("");
  const [display, setDisplay] = useState(<div></div>);

  function getBookInfo() {
    axios
      .get(`/api/book/60ce3492ff5a72a52d196d2c`)
      .then((res) => {
        console.log(res.data);
        setBook(res.data);
        setLoading(false);
        setDisplay(<MappedChapters chapters={res.data.chapters} />);
      })
      .catch((err) => err);
    // axios
    //   .get("/api/bookreviews")
    //   .then((res) => {
    //     setReviews(res.data);
    //   })
    // .catch((err) => err);
  }

  useLayoutEffect(() => {
    getBookInfo();
  }, []);

  useEffect(() => {
    if (book.authorID) {
      axios.get(`/api/users/${book.authorID}`).then((res) => {
        setAuthor(res.data.username);
      });
    } else console.log("no authorID");
  }, [book]);

  let mappedReviews = reviews.map((e: any, i: any) => (
    <ReviewCard
      width={"100px"}
      title={e.title}
      author={e.author}
      content={e.content}
      date={e.date}
    />
  ));

  function componentSwap(num: number) {
    if (num === 1) {
      console.log("hit display 1");
      setDisplay(<MappedChapters chapters={book.chapters} />);
    } else setDisplay(<div>{mappedReviews}</div>);
  }

  function loadCheck() {
    console.log(book.chapters);
    if (!isLoading) {
      return (
        <div className="book-container">
          <section id="book-info">
            <img
              id="cover-image-size"
              src={book.coverImage}
              alt={book.title}
            ></img>
            <section className="info">
              <p className="font-lg">{`${book.title}`}</p>
              <p className="font-md">{`${author}`}</p>
              <p className="font-md">{`${book.tags}`}</p>
              <p className="font-md description">{`${book.description}`}</p>
              <Link to="/login">
                <Button
                  styleName={"add-book-shelf"}
                  label={"Add to Bookshelf"}
                  handleClick={() => {
                    let { userId } = props.userReducer;
                    axios.post(`/api/bookshelf/${book._id}`, {
                      userId: userId,
                    });
                  }}
                />
              </Link>
            </section>
          </section>
          <section id="button-s-container">
            <h1 className="swap-button" onClick={() => componentSwap(1)}>
              Chapters
            </h1>
            <h1 className="swap-button" onClick={() => componentSwap(2)}>
              Reviews
            </h1>
          </section>
          <section>{display}</section>
        </div>
      );
    } else return <div>I am loading</div>;
  }
  return <div>{loadCheck()}</div>;
};
const mapStateToProps = (state: any) => state;
export default connect(mapStateToProps, null)(BookView);
