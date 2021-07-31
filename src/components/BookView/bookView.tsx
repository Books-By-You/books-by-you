import React, { useState, useLayoutEffect, useEffect } from "react";
import { connect } from "react-redux";
import { Props } from "../auth/authInterface";
import axios from "axios";
import ReviewCard from "../ReviewCard/ReviewCard";
import MappedChapters from "./MappedChapters";
import { useLocation } from "react-router-dom";
import OwnerControl from "./ownerControl";
import Loading from "../Loading/Loading";
import "./BookView.scss";

const BookView: React.FC<Props> = (props) => {
  const [bookId] = useState(props.match.params.id);
  const [isLoading, setLoading] = useState(true);
  const [owner, setOwner] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [book, setBook] = useState({
    _id: "",
    title: "",
    tags: [],
    ratings: 0,
    authorID: "",
    description: "",
    coverImage: "",
    chapters: [],
  });
  const [author, setAuthor] = useState("");
  let location = useLocation();
  let { userReducer } = props;

  function getBookInfo() {
    let bookId = location.pathname.split("/")[2];
    axios
      .get(`/api/book/${bookId}`)
      .then((res) => {
        setBook(res.data);
        setLoading(false);
      })
      .catch((err) => err);
    // axios
    //   .get(`/api/bookreview/${bookId}`)
    //   .then((res) => {
    //     if (res.data) {
    //     } else {
    //       return "no reviews";
    //     }
    //     setReviews(res.data);
    //   })
    //   .catch((error) => {
    //     return console.error(error.message);
    //   });
    updateReviews();
  }

  function updateReviews() {
    console.log("hit update reviews");
    axios
      .get(`/api/bookreview/${bookId}`)
      .then((res) => {
        if (res.data) {
        } else {
          return "no reviews";
        }
        console.log(res.data);
        setReviews(res.data);
      })
      .catch((error) => {
        return console.error(error.message);
      });
  }

  let ownerCheck = () => {
    if (book.authorID === props.userReducer.userId) {
      setOwner(true);
    } else setOwner(false);
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
      bookId={book._id}
      ratings={book.ratings}
      updateReviews={updateReviews}
    />
  ));

  function loadCheck() {
    if (!isLoading) {
      return (
        <section>
          <section className="book-container">
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
                  updateReviews={updateReviews}
                  userReducer={userReducer}
                  owner={owner}
                  userId={props.userReducer.userId}
                  bookId={book._id}
                  ratings={book.ratings}
                />
              </section>
            </section>
          </section>
          <section style={{ paddingTop: 20 }} className="book-container">
            <h1 style={{ marginTop: 10, marginLeft: 30 }} className="font-lg">
              Chapters
            </h1>
            <MappedChapters
              bookID={bookId}
              owner={owner}
              chapters={book.chapters}
            />
          </section>
          <section style={{ paddingTop: 20 }} className="book-container">
            <h1 style={{ marginTop: 10, marginLeft: 30 }} className="font-lg">
              Reviews
            </h1>
            {mappedReviews}
          </section>
        </section>
      );
    } else
      return (
        <div className="book-loading-container">
          <Loading />
        </div>
      );
  }
  return <div>{loadCheck()}</div>;
};
const mapStateToProps = (state: any) => state;
export default connect(mapStateToProps, null)(BookView);
