import React, { useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import "../BookView/BookView.scss";
interface Props {
  chapters: any;
  owner: boolean;
  bookID: string;
}
const MappedChapters: React.FC<Props> = (props) => {
  const [chapters, setChapters] = useState([]);
  console.log("book id:", props.bookID);
  function chapterLoop() {
    let mappedArr: any = props.chapters.map((element: any, i: number) => (
      <section style={{ margin: 5 }}>
        <Link
          to={`reading/${props.bookID}/${element.number}`}
          id="chapter-link"
        >
          Chapter {element.number}
        </Link>
      </section>
    ));
    setChapters(mappedArr);
  }
  useLayoutEffect(() => {
    chapterLoop();
  }, []);

  return (
    <div className="data-container">
      <div id="chapter-map">{chapters}</div>
    </div>
  );
};

export default MappedChapters;
