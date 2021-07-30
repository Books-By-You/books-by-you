import React, { useState, useEffect } from "react";
import { Props } from "../auth/authInterface";
import { Carousel } from "react-responsive-carousel";
import BookCard from "../BookCard/BookCard";
import { SliderData } from "../searchView/SliderData";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./HomeView.scss";
import axios from "axios";

// 3 or 4 carousels. Map over different genres to show popular books in that genre
// 10 to 15 books per carousel
// going to need to grab books by tag - backend query?
// endpoint to send back popular titles w/ tag if no tag just hit endpoint for popular titles

const HomeView: React.FC = (props) => {
  const [carouselBooks, setCarouselBooks] = useState([]);

  useEffect(() => {
    axios.get("/api/books").then((res) => {
      console.log(res.data);
      setCarouselBooks(res.data);
    });
  }, []);

  let fantasyBooks = carouselBooks.filter((e: any, i: any) => {
    return e.tags.includes("Fantasy");
  });

  let scienceFictionBooks = carouselBooks.filter((e: any, i: any) => {
    return e.tags.includes("Science Fiction");
  });

  let nonFictionBooks = carouselBooks.filter((e: any, i: any) => {
    return e.tags.includes("Non-Fiction");
  });

  function bookMap(e: any, i: any) {
    return (
      <BookCard
        key={e._id}
        title={e.title}
        image_url={e.coverImage}
        ratings={e.ratings}
        bookId={e._id}
      ></BookCard>
    );
  }

  console.log(fantasyBooks);

  let mappedFantasyBooks = fantasyBooks.map(bookMap);
  let mappedScienceFictionBooks = scienceFictionBooks.map(bookMap);
  let mappedNonFictionBooks = nonFictionBooks.map(bookMap);

  let fantasyPartOne = mappedFantasyBooks.slice(0, 5);
  let fantasyPartTwo = mappedFantasyBooks.slice(5, 10);
  let fantasyPartThree = mappedFantasyBooks.slice(10, 15);

  let scienceFictionPartOne = mappedScienceFictionBooks.slice(0, 5);
  let scienceFictionPartTwo = mappedScienceFictionBooks.slice(5, 10);
  let scienceFictionPartThree = mappedScienceFictionBooks.slice(10, 15);

  let nonFictionPartOne = mappedNonFictionBooks.slice(0, 5);
  let nonFictionPartTwo = mappedNonFictionBooks.slice(5, 10);
  let nonFictionPartThree = mappedNonFictionBooks.slice(10, 15);

  return (
    <div id="home-view">
      <section className="carousel-body-container">
        <Carousel
          className="welcome-carousel"
          interval={8000}
          autoPlay={true}
          infiniteLoop={true}
        >
          <div className="home-carousel">
            <h1>BOOKS BY YOU</h1>
          </div>

          <div className="home-carousel">
            <h1>Be Yourself, Everyone else is already taken - Oscar Wilde</h1>
          </div>

          <div className="home-carousel">
            <h1>Let's Dive In!</h1>
            <span className="home-links">
              <li>
                <Link className="home-view-links" to="/login">
                  Login
                </Link>
              </li>
              <li>
                <Link className="home-view-links" to="/search">
                  Search
                </Link>
              </li>
            </span>
          </div>
          {/* <div className="home-carousel">
          <h1>Recommended Books!</h1>
        </div> */}
        </Carousel>
        <section>
          <h3 className="genre-tag">Fantasy</h3>
          <Carousel
            className="fantasy-carousel"
            interval={8000}
            autoPlay={true}
            infiniteLoop={true}
            width="1400px"
          >
            <div>
              <div className="book-map">{fantasyPartOne}</div>
            </div>
            <div className="book-map">{fantasyPartTwo}</div>
            <div className="book-map">{fantasyPartThree}</div>
          </Carousel>
        </section>
        <section>
          <h3 className="genre-tag">Science Fiction</h3>
          <Carousel
            interval={8000}
            infiniteLoop={true}
            autoPlay={true}
            width="1400px"
          >
            <div className="book-map">{scienceFictionPartOne}</div>
            <div className="book-map">{scienceFictionPartTwo}</div>
            <div className="book-map">{scienceFictionPartThree}</div>
          </Carousel>
        </section>
        <section>
          <h3 className="genre-tag">Non-Fiction</h3>
          <Carousel
            interval={8000}
            infiniteLoop={true}
            autoPlay={true}
            width="1400px"
          >
            <div className="book-map">{nonFictionPartOne}</div>
            <div className="book-map">{nonFictionPartTwo}</div>
            <div className="book-map">{nonFictionPartThree}</div>
          </Carousel>
        </section>
      </section>
    </div>
  );
};

export default HomeView;
