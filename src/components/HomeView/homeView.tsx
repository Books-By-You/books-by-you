import React, { useState } from "react";
import { Props } from "../auth/authInterface";
import { Carousel } from "react-responsive-carousel";
import BookCard from "../BookCard/BookCard";
import {SliderData} from "../searchView/SliderData"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import "./HomeView.scss"
import axios from "axios";


// 3 or 4 carousels. Map over different genres to show popular books in that genre
// 10 to 15 books per carousel
// going to need to grab books by tag - backend query?
// endpoint to send back popular titles w/ tag if no tag just hit endpoint for popular titles

const HomeView: React.FC<Props> = (props) => {
  const [carouselBooks, setCarouselBooks] = useState([])

  axios.get('/api/books').then(res => {
    console.log(res.data)
    setCarouselBooks(res.data)
  })

  let fantasyBooks = carouselBooks.map((e: any, i: any) => {
    return e.tags.includes("comedy")
  })


  let fictionBooks = carouselBooks.map((e: any, i: any) => {
    return e.tags.includes("fiction")
  })


  let romanceBooks = carouselBooks.map((e: any, i: any) => {
    return e.tags.includes("romance")
  })

  function bookMap(e:any,i:any){
    return <BookCard title={e.title} image_url={e.image_url} rating={e.rating} bookId={e.bookId}></BookCard>}
    console.log(fantasyBooks)
  let mappedFantasyBooks = fantasyBooks.map(bookMap)
  let mappedFictionBooks = fictionBooks.map(bookMap)
  let mappedRomanceBooks = romanceBooks.map(bookMap)
  
  let fantasyPartOne = mappedFantasyBooks.slice(0,5)
  let fantasyPartTwo = mappedFantasyBooks.slice(5,10)
  let fantasyPartThree = mappedFantasyBooks.slice(10,15)

  let fictionPartOne = mappedFictionBooks.slice(0,5)
  let fictionPartTwo = mappedFictionBooks.slice(5,10)
  let fictionPartThree = mappedFictionBooks.slice(10,15)

  let romancePartOne = mappedRomanceBooks.slice(0,5)
  let romancePartTwo = mappedRomanceBooks.slice(5,10)
  let romancePartThree = mappedRomanceBooks.slice(10,15)

  return (
    <div id="home-view">
      <section className="carousel-body-container">
      <Carousel  className="welcome-carousel" interval={8000} autoPlay={true} infiniteLoop={true}
      >
        <div className="home-carousel-1">is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's 
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled 
          it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic 
          typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets 
          containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including 
          versions of Lorem Ipsum.
        </div>
        <div className="home-carousel-2"> 
          <h1>Get Started Reading</h1>
          <li>
            <a href="/login">
              Login
            </a>
          </li>
          <li>
            <a href="/search">
              Search
            </a>
          </li>
        </div>
        <div className="home-carousel-3">
          <h1>Recommended Books!</h1>
        </div>
      </Carousel>
      <section>
        <Carousel interval={8000} infiniteLoop={true} width="1000px">
          <div className="book-map">
            {fantasyPartOne}
          </div>
           <div className="book-map">
            {fantasyPartTwo}
           </div>
           <div className="book-map">
             {fantasyPartThree}
           </div>
        </Carousel>
      </section>
      <section>
      <Carousel interval={8000} infiniteLoop={true} width="1000px">
          <div className="book-map">
            {fictionPartOne}
          </div>
           <div className="book-map">
            {fictionPartTwo}
           </div>
           <div className="book-map">
             {fictionPartThree}
           </div>
        </Carousel>

      </section>
      <section>
      <Carousel interval={8000} infiniteLoop={true} width="1000px">
          <div className="book-map">
            {romancePartOne}
          </div>
           <div className="book-map">
            {romancePartTwo}
           </div>
           <div className="book-map">
             {romancePartThree}
           </div>
        </Carousel>
      </section>
    </section>
    </div>
  );
}

export default HomeView;
