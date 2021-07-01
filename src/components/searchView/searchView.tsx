import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import search from "./search.png";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { SliderData } from "./SliderData";
import "./searchView.scss"

const SearchView: React.FC = () => {
  //need 15 "objects to fill array from back end"
  const [slidesArray, setSlidesArray] = useState([SliderData]);

  function arrayMapper(slide: any, index: any) {
    return (
      <div>
        <img src={slide.image} alt="book cover" />
        <li> {slide.title}</li>
        <li>{slide.rating}</li>
      </div>
    );
  }

  function arraySplitter() {
    //write a function that takes in an array of 15 objects [{},{},{}] then aplit them into 3 other arrays with 5 opobjects each
  }

  const listBooks = SliderData.map(arrayMapper);
  return (
    <div className="searchView">
      <div>
        <Carousel>
            {listBooks}
          {/* <div>
            <img src="https://www.abebooks.com/Mirror-Work-21-Days-Heal-Life/30924143040/bd?cm_mmc=ggl-_-US_Shopp_Textbook-_-product_id=COM9781401949822USED-_-keyword=&gclid=CjwKCAjwieuGBhAsEiwA1Ly_nTJz0K7YVDSV_9ZKYSB1QzUWrPukOwbMR8JtwZIkwKqztpMrv-UMCBoC2b8QAvD_BwE#&gid=1&pid=1" />
            <p className="legend">Legend 1</p>
          </div>
          <div>
            <img src="https://images-na.ssl-images-amazon.com/images/I/71aFt4+OTOL.jpg" />
            <p className="legend">Legend 2</p>
          </div>
          <div>
            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/5/5f/AngelsAndDemons.jpg/220px-AngelsAndDemons.jpg" />
            <p className="legend">Legend 3</p>
          </div> */}
        </Carousel>
      </div>
      <div className="search_wrap">
        <div className="search">
          <div className="search_field">
            <button className="searchbutton">
              <img className="searchicon" src={search} alt="search" />
            </button>
            <input
              className="search_input"
              type="text"
              placeholder="search"
            ></input>

            {/* <button className="search_button"> Filter</button> */}
            <div className="dropdown">
              <button className="filter_button">Filter</button>
              <div className="dropdown-content">
                <a href="#">Link 1</a>
                <a href="#">Link 2</a>
                <a href="#">Link 3</a>
              </div>
            </div>
            {/* <div className={`gradient-bottom-border2`}></div> */}
          </div>
        </div>
        <div className="search"></div>
        <div className="search"></div>
        <div className="search"></div>
      </div>
    </div>
  );
};

export default SearchView;

// ReactDOM.render(<SearchView />, document.querySelector('.demo-carousel'));
