import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import search from "./search.png";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { SliderData } from "./SliderData";
import { SliderData2 } from "./SliderData2";
import "./searchView.scss";
import BookCard from "../BookCard/BookCard";

const SearchView: React.FC = () => {
  //need 15 "objects to fill array from back end"
  const [slidesArray, setSlidesArray] = useState([SliderData]);

  function arrayMapper(slide: any, index: any) {
    return (
      <BookCard
        title={slide.title}
        image_url={slide.image}
        rating={slide.rating}
        description={slide.description}
      />
    );
  }

  function arraySplitter() {
    //write a function that takes in an array of 15 objects [{},{},{}] then aplit them into 3 other arrays with 5 opobjects each
  }

  const listBooks = SliderData.map(arrayMapper);
  const listBooks2 = SliderData2.map(arrayMapper);
  return (
    <div className="searchView">
      <div className="carousel-container">
        <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false}>
          <div className="book-carousel-1">{listBooks2}</div>

          <div>
            <img
              className="pexels-cover"
              src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2b20731b-c5cc-478f-89fb-1144dae59b4c/ddco802-08c091ea-7f5b-411c-bb9a-4a4b8c161d9f.png/v1/fill/w_1192,h_670,q_70,strp/riftflower_by_brillick_ddco802-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9OTAwIiwicGF0aCI6IlwvZlwvMmIyMDczMWItYzVjYy00NzhmLTg5ZmItMTE0NGRhZTU5YjRjXC9kZGNvODAyLTA4YzA5MWVhLTdmNWItNDExYy1iYjlhLTRhNGI4YzE2MWQ5Zi5wbmciLCJ3aWR0aCI6Ijw9MTYwMCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.8ul2AIvneg5ntDbXqVfMyyTSERPtqd5tRugNaYbKzcw"
            />
            <p className="legend"></p>
          </div>

          <div className="book-carousel-1">{listBooks2}</div>

          <div>
            <img
              className="pexels-cover"
              src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2b20731b-c5cc-478f-89fb-1144dae59b4c/dei00tb-25e0a99b-e6c1-416e-a7fb-65d3ac53563e.png/v1/fill/w_1024,h_656,q_80,strp/forest_flowers_by_brillick_dei00tb-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NjU2IiwicGF0aCI6IlwvZlwvMmIyMDczMWItYzVjYy00NzhmLTg5ZmItMTE0NGRhZTU5YjRjXC9kZWkwMHRiLTI1ZTBhOTliLWU2YzEtNDE2ZS1hN2ZiLTY1ZDNhYzUzNTYzZS5wbmciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.ySOA-AINhTmYdIOMMHQKwNOyUnCXMWR2clkIGuFWSb4"
            />

            <p className="legend"></p>
          </div>

          <div className="book-carousel-1">{listBooks2}</div>

          <div>
            <img
              className="pexels-cover"
              src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2b20731b-c5cc-478f-89fb-1144dae59b4c/delf1gs-552c40f4-e67c-4704-8e7f-69d214a8b214.png/v1/fill/w_1192,h_670,q_70,strp/flowers_by_brillick_delf1gs-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9OTAwIiwicGF0aCI6IlwvZlwvMmIyMDczMWItYzVjYy00NzhmLTg5ZmItMTE0NGRhZTU5YjRjXC9kZWxmMWdzLTU1MmM0MGY0LWU2N2MtNDcwNC04ZTdmLTY5ZDIxNGE4YjIxNC5wbmciLCJ3aWR0aCI6Ijw9MTYwMCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.TkOkSl219Z_ZzeE6BPgEQcFOB0bGPUAPkEL6s0w7vLg"
            />

            <p className="legend"></p>
          </div>
        </Carousel>
        <div className="heading">
          {" "}
          <h1> Our Popular Books!</h1>
        </div>
      </div>

      <div className="search_wrap">
        <div className="search">
          <div className="search_field">
            <span className="input-icon">
              <button className="searchbutton">
                <img className="searchicon" src={search} alt="search" />
              </button>
              <input
                className="search_input"
                type="text"
                placeholder="search"
              ></input>
            </span>
            {/* <button className="search_button"> Filter</button> */}
            <div className="dropdown">
              <button className="filter_button">Filter</button>
              <div className="dropdown-content">
                <a href="#">Link 1</a>
                <a href="#">Link 2</a>
                <a href="#">Link 3</a>
              </div>
            </div>
            <section className="gradient-line">
              <div className={`gradient-bottom-border2`}></div>
            </section>
          </div>
        </div>
        <div className="search-result-container">
          <div className="search-result"> {listBooks}</div>
          {/* <div className="search"></div>
          <div className="search"></div> */}
        </div>
      </div>
    </div>
  );
};

export default SearchView;

// ReactDOM.render(<SearchView />, document.querySelector('.demo-carousel'));