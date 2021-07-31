import React, { useState, useLayoutEffect } from "react";
import search1 from "./search.png";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import "./searchView.scss";
import BookCard from "../BookCard/BookCard";
import axios from "axios";
import Button from "../Button/Button";

const SearchView: React.FC = () => {
  const [filterBySearch, setFilterBySearch] = useState(false);
  const [filterByCategory, setFilterByCategory] = useState(false);
  const [bookLists, setBookLists] = useState<any>([]);
  const [filteredBookListBySearch, setFilteredBookListBySearch] = useState<any>(
    []
  );
  const [filteredBookListByDropdown, setFilteredBookListByDropdown] = useState(
    []
  );
  const [dblFiltCatFirst, setDblFiltCatFirst] = useState(false);
  const [category, setCategory] = useState("Filter");
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e: any) => {
    setCategory(e.target.value);
    if (filterBySearch) {
      console.log("filtering filtered books by category");
      const filteredByCategory = filteredBookListBySearch.filter(
        (book: any) => {
          return book.tags[0].toLowerCase() === e.target.value.toLowerCase();
        }
      );
      console.log(filteredByCategory);
      setFilterByCategory(true);
      setFilteredBookListByDropdown(filteredByCategory);
    }
    if (!filterBySearch) {
      console.log("filtering non-filtered books by category");
      const filteredByCategory = bookLists.filter((book: any) => {
        return book.tags[0].toLowerCase() === e.target.value.toLowerCase();
      });
      setFilterByCategory(true);
      setFilteredBookListByDropdown(filteredByCategory);
    }
  };

  const handleSearchSubmit = () => {
    if (searchInput && filterByCategory) {
      const filteredBooks = filteredBookListByDropdown.filter((book: any) =>
        book.title.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilteredBookListBySearch(filteredBooks);
      setFilterBySearch(true);
      setDblFiltCatFirst(true);
      setSearchInput("");
    }
    if (searchInput && !filterByCategory) {
      console.log("filtering non-filtered books");
      const filteredBooks = bookLists.filter((book: any) =>
        book.title.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilterBySearch(true);
      setFilteredBookListBySearch(filteredBooks);
      setSearchInput("");
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const clearFilter = () => {
    setFilteredBookListBySearch([]);
    setFilteredBookListByDropdown([]);
    setCategory("Filter");
    setFilterBySearch(false);
    setFilterByCategory(false);
    setDblFiltCatFirst(false);
  };

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
  const filteredBooks = filteredBookListBySearch.map(arrayMapper);
  const doubleFilteredBooks = filteredBookListByDropdown.map(arrayMapper);
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
                  <option value="Fantasy">Fantasy</option>
                  <option value="Science Fiction">Science Fiction</option>
                  <option value="Romance">Romance</option>
                  <option value="Non Fiction">Non Fiction</option>
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
          {filterBySearch || filterByCategory ? (
            <Button
              label="Clear Filter"
              styleName="search-button"
              handleClick={clearFilter}
            />
          ) : null}
        </div>
        <div className="search-result-container">
          <div className="search-result">
            {!filterBySearch && !filterByCategory
              ? listBooks
              : filterBySearch && !filterByCategory
              ? filteredBooks
              : !filterBySearch && filterByCategory
              ? doubleFilteredBooks
              : filterBySearch && filterByCategory && dblFiltCatFirst
              ? filteredBooks
              : doubleFilteredBooks}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchView;
