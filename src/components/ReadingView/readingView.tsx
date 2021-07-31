import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoIosArrowForward } from 'react-icons/io'
import { IoIosArrowBack } from 'react-icons/io'
import ReactDOM from "react-dom";
import { Props } from "../auth/authInterface";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./readingView.scss";

const ReadingView: React.FC<Props> = (props) => {
  const [bookId] = useState(props.match.params.book);
  const [chapterNumber, setChapterNumber] = useState(props.match.params.chapter);
  const [bookTitle, setBookTitle] = useState("Book Title")
  const [chapters, setChapters] = useState([{title: "", content: ""}]);

  function fetchBook() {
    axios
      .get(`/api/book/${bookId}`)
      .then((res) => {  
        setChapters(res.data.chapters)
        setBookTitle(res.data.title)
      })
      .catch((err) => err);
  }

  function nextChapter() {
    if (chapterNumber === chapters.length) {
      return
    }
    setChapterNumber(+chapterNumber + 1)
  }

  function lastChapter() {
    if (chapterNumber === 1) {
      return
    }
    setChapterNumber(+chapterNumber - 1)
  }

  useEffect(() => {
    fetchBook()
  }, [])

  let chapter = chapters[chapterNumber - 1] ? chapters[chapterNumber - 1] : {title: "loading", content: "loading"}

  let backButton = chapterNumber > 1 ? <button className="chapter-nav-btn" onClick={() => lastChapter()}><IoIosArrowBack/></button> : <button disabled className="chapter-nav-btn-disabled" onClick={() => lastChapter()}><IoIosArrowBack/></button>
  let nextButton = chapterNumber < chapters.length ? <button className="chapter-nav-btn" onClick={() => nextChapter()}><IoIosArrowForward/></button> : <button disabled className="chapter-nav-btn-disabled" onClick={() => nextChapter()}><IoIosArrowForward/></button>

  return (
    <section className="reading-section">
    {backButton}
    <div className="body-cover">
      <div className="book-title">
        <h1 className="chapter-heading"> {bookTitle} </h1>
        <h3 className="chapter-text">{chapter.title}</h3>
      </div>

      <div className="chapter-content-static">
          <p>{chapter.content}</p>
      </div>
      {/* <div className="chapter-carousel">
        <Carousel
          selectedItem={2}
          autoPlay={false}
          infiniteLoop={true}
          showThumbs={false}
        >
          <div className="page-slider">
            <h1 className="chapter-text">
              {" "}
              {chapter.content}
            </h1>
          </div>

          <div>
            <h1 className="chapter-text">
              Pharetra diam sit amet nisl. Urna molestie at elementum eu
              facilisis sed odio. Lobortis feugiat vivamus at augue eget arcu
              dictum varius duis. Odio euismod lacinia at quis risus sed
              vulputate. Velit sed ullamcorper morbi tincidunt ornare massa
              eget. At tempor commodo ullamcorper a lacus. Lectus nulla at
              volutpat diam ut venenatis. Mi eget mauris pharetra et ultrices
              neque ornare aenean. Felis imperdiet proin fermentum leo vel orci
              porta non. Viverra orci sagittis eu volutpat odio facilisis
              mauris. Tristique senectus et netus et. Egestas pretium aenean
              pharetra magna ac placerat vestibulum lectus. Vestibulum morbi
              blandit cursus risus at ultrices mi tempus. Imperdiet nulla
              malesuada pellentesque elit eget gravida cum. Risus at ultrices mi
              tempus imperdiet. Egestas integer eget aliquet nibh praesent
              tristique. Venenatis tellus in metus vulputate eu scelerisque
              felis imperdiet. Quam lacus suspendisse faucibus interdum. Nunc
              sed blandit libero volutpat sed. Feugiat sed lectus vestibulum
              mattis. Nulla facilisi nullam vehicula ipsum a arcu cursus.
              Egestas congue quisque egestas diam. Nunc consequat interdum
              varius sit amet mattis vulputate enim nulla. Proin nibh nisl
              condimentum id venenatis a condimentum. Elementum nibh tellus
              molestie nunc non blandit massa enim nec. Ac odio tempor orci
              dapibus ultrices. In arcu cursus euismod quis viverra nibh cras
              pulvinar. Id semper risus in hendrerit gravida. Ipsum suspendisse
              ultrices gravida dictum fusce ut. Metus dictum at tempor commodo
              ullamcorper a lacus vestibulum sed. Est pellentesque elit
              ullamcorper dignissim cras.{" "}
            </h1>
          </div>

          <div>
            <h1 className="chapter-text">
              {" "}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac
              tortor vitae purus faucibus ornare suspendisse sed nisi. Arcu non
              odio euismod lacinia at quis risus sed. Arcu risus quis varius
              quam quisque. Fusce ut placerat orci nulla pellentesque dignissim
              enim sit. Senectus et netus et malesuada fames ac turpis egestas
              integer. Urna id volutpat lacus laoreet non curabitur gravida. Mi
              bibendum neque egestas congue. Feugiat nisl pretium fusce id velit
              ut tortor pretium. Eu nisl nunc mi ipsum faucibus vitae aliquet
              nec. Ornare suspendisse sed nisi lacus sed viverra tellus in hac.
              Placerat vestibulum lectus mauris ultrices eros in cursus. Aliquet
              bibendum enim facilisis gravida neque convallis a cras. Sit amet
              nisl suscipit adipiscing bibendum est ultricies integer. Hendrerit
              dolor magna eget est lorem. Pellentesque pulvinar pellentesque
              habitant morbi. Eu mi bibendum neque egestas congue quisque
              egestas diam in. Orci eu lobortis elementum nibh tellus molestie.
              Quis blandit turpis cursus in hac habitasse platea. Magna eget est
              lorem ipsum dolor. Nunc pulvinar sapien et ligula ullamcorper
              malesuada proin. Velit laoreet id donec ultrices tincidunt arcu
              non sodales. Vel risus commodo viverra maecenas accumsan. Nunc
              faucibus a pellentesque sit amet porttitor eget. Urna condimentum
              mattis pellentesque id nibh tortor id aliquet lectus. Ut tortor
              pretium viverra suspendisse potenti nullam ac tortor vitae.
              Aliquet eget sit amet tellus cras adipiscing enim eu. Neque
              sodales ut etiam sit. Et tortor at risus viverra adipiscing at in
              tellus integer. Ultrices neque ornare aenean euismod. Quis vel
              eros donec ac odio tempor orci. Lectus mauris ultrices eros in
              cursus. Dolor sed viverra ipsum nunc aliquet bibendum enim
              facilisis. Sit amet massa vitae tortor..
            </h1>
          </div>
        </Carousel>
      </div> */}
    </div>
    {nextButton}
    </section>
  );
};

export default ReadingView;
