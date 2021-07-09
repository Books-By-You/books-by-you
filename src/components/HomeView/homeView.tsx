import React, { useState } from "react";
import { Props } from "../auth/authInterface";
import { Carousel } from "react-responsive-carousel";


const HomeView: React.FC<Props> = (props) => {
  const [carouselBooks,setCarouselBooks] = useState([])

  function genreMapper(){
    //this function will take in a array returned from the back end and
  }

  let mappedBooksList = carouselBooks.map
  return (
    <div>
      <Carousel autoPlay={true} infiniteLoop={true}
      width="1000px">
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
          <h1>Recomended Books!</h1>
          {mappedBooksList}
        </div>
      </Carousel>
      <section>

      </section>
      <section>

      </section>
      <section>

      </section>
    </div>
  );
}

export default HomeView;
