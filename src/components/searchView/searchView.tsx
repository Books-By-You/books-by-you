import React, { useState, useLayoutEffect } from "react";
import search1 from "./search.png";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { SliderData } from "./SliderData";
import { SliderData2 } from "./SliderData2";
import "./searchView.scss";
import BookCard from "../BookCard/BookCard";
import axios from "axios";
import Button from "../Button/Button";

const SearchView: React.FC = () => {
  //need 15 "objects to fill array from back end"
  const [slidesArray, setSlidesArray] = useState([SliderData]);
  const [filter, setFilter] = useState(false);
  const [bookLists, setBookLists] = useState<any>([]);
  const [filteredBookList, setFilteredBookList] = useState([]);
  const [category, setCategory] = useState("Filter");
  const [searchInput, setSearchInput] = useState("");
  const [books, setBooks] = useState([]);

  const handleChange = (e: any) => {
    setCategory(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchInput && bookLists) {
      const filteredBooks = bookLists.filter((book: any) =>
        book.title.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilter(true);
      setFilteredBookList(filteredBooks);
      setSearchInput("");
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const clearFilter = () => {
    setFilteredBookList([]);
    setFilter(false);
  };

  // axios.get("/api/books").then((res) => {
  //   const books = res.data;
  //   setBooks(books );
  // });
  //     axios.get(`/api/book/${search}`).then((res) => {
  //       const books = res.data;
  //       return books
  //       });

  function arrayMapper(book: any, index: any) {
    return (
      <BookCard
        title={book.title}
        image_url={book.coverImage}
        ratings={book.ratings}
        bookId={book._id}
        description={book.description}
      />
    );
  }
  function carouselMapper(book: any, index: any) {
    return (
      <BookCard
        title={book.title}
        image_url={book.coverImage}
        ratings={book.ratings}
        bookId={book._id}
      />
    );
  }

  useLayoutEffect(() => {
    axios.get("/api/books").then((res) => {
      setBookLists(res.data);
    });
  }, []);

  let fantasyBooks = bookLists.filter((e: any, i: any) => {
    return e.tags.includes("Fantasy");
  });

  const listBooks = bookLists.map(arrayMapper);
  const carouselBooks = fantasyBooks.map(carouselMapper);
  let carouselPartOne = carouselBooks.slice(0, 5);
  let carouselPartTwo = carouselBooks.slice(6, 10);
  const filteredBooks = filteredBookList.map(arrayMapper);
  return (
    <div className="searchView">
      <div className="carousel-container">
        <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false}>
          <div className="book-carousel-1">{carouselPartOne}</div>
          <div className="book-carousel-1">{carouselPartTwo}</div>
        </Carousel>
        <div className="heading">
          <h1> Our Popular Books!</h1>
        </div>
      </div>

      <div className="search_wrap">
        <div className="search">
          <div className="search_field">
            <span className="input-icon">
              <button className="searchbutton" onClick={handleSearchSubmit}>
                <img className="searchicon" src={search1} alt="search" />
              </button>
              <input
                onChange={({ target }) => setSearchInput(target.value)}
                value={searchInput}
                className="search_input"
                type="text"
                placeholder="search"
              ></input>
            </span>

            <form onSubmit={handleSubmit}>
              <label>
                <h4 className="filter-tag">Filter</h4>
                <select
                  className="filter_button"
                  value={category}
                  onChange={handleChange}
                >
                  <option value="Filter" selected disabled hidden>
                    Filter by Genre
                  </option>
                  <option value="Thriller">Fantasy</option>
                  <option value="Sci-Fi">Science Fiction</option>
                  <option value="Romance">Romance</option>
                  <option value="History">Non-Fiction</option>
                </select>
              </label>
              <br />
              <br />
              <label></label>
            </form>

            <section className="gradient-line">
              <div className={`gradient-bottom-border2`}></div>
            </section>
          </div>
          {filter && (
            <Button
              label="Clear Filter"
              styleName="search-button"
              handleClick={clearFilter}
            />
          )}
        </div>
        <div className="search-result-container">
          {/* <div className="search-result"> {listBooks}</div> */}
          <div className="search-result">
            {filter ? filteredBooks : listBooks}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchView;
