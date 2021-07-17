import axios from "axios";
import React, { useState, useLayoutEffect } from "react";
import "../BookView/BookView.scss";
interface Props {
  chapters: any;
}
const MappedChapters: React.FC<Props> = (props) => {
  const [chapters, setChapters] = useState([]);
  function chapterLoop() {
    console.log(props.chapters);
    let mappedArr: any = props.chapters.map((element: any, i: number) => (
      <a href={`/reading/:${element.number + 1}`} key={i + 1} id="chapter-link">
        {"Chapter " + (element.number + 1)}
      </a>
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
