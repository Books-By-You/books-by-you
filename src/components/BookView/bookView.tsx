import React, { useState, useLayoutEffect, useEffect } from "react";
import { connect } from "react-redux";
import { Props } from "../auth/authInterface";
import axios, { AxiosResponse } from "axios";
import ReviewCard from "../ReviewCard/ReviewCard";
import MappedChapters from "./MappedChapters";
import Button from "../Button/Button";
import Rating from "../Rating/Rating";
import { Link, useLocation } from "react-router-dom";
import OwnerControl from "./ownerControl";
import "./BookView.scss";

const BookView: React.FC<Props> = (props) => {
  const [bookId, setBookId] = useState(props.match.params.id);
  const [isLoading, setLoading] = useState(true);
  const [owner, setOwner] = useState(false);
  const [reviews, setReviews] = useState([
    {
      _id: "",
      userID: "60e0b11a0a55191558d7d9a8",
      content:
        " scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more rec",
      reviewDate: "12/12",
    },
  ]);
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
  let location = useLocation();
  let { userReducer } = props;

  function getBookInfo() {
    let bookId = location.pathname.split("/")[2];
    axios
      .get(`/api/book/${bookId}`)
      .then((res) => {
        console.log(res.data);
        setBook(res.data);
        setLoading(false);
        setDisplay(
          <MappedChapters owner={owner} chapters={res.data.chapters} />
        );
      })
      .catch((err) => err);
  }
  let ownerCheck = () => {
    if (book.authorID === props.userReducer.userId) {
      setOwner(true);
    } else console.log("no");
  };
  useLayoutEffect(() => {
    getBookInfo();
  }, []);
  useEffect(() => {
    if (book.authorID) {
      axios.get(`/api/users/${book.authorID}`).then((res) => {
        setAuthor(res.data.username);
      });
      ownerCheck();
    } else console.log("no authorID");
  }, [book]);

  let mappedReviews = reviews.map((e: any, i: any) => (
    <ReviewCard
      width={"1100px"}
      _id={e._id}
      author={e.userID}
      content={e.content}
      date={e.date}
      user={props.userReducer.userId}
    />
  ));
  function componentSwap(num: number) {
    if (num === 1) {
      console.log("hit display 1");
      setDisplay(<MappedChapters owner={owner} chapters={book.chapters} />);
    } else setDisplay(<div>{mappedReviews}</div>);
  }

  function loadCheck() {
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
              <OwnerControl
                userReducer={userReducer}
                owner={owner}
                userId={props.userReducer.userId}
                bookId={book._id}
              />
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
