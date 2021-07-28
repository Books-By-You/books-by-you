import axios from "axios";
import React, { useState, useLayoutEffect } from "react";
import "../BookView/BookView.scss";
interface Props {
  chapters: any;
  owner: boolean;
}
const MappedChapters: React.FC<Props> = (props) => {
  const [chapters, setChapters] = useState([]);
  function chapterLoop() {
    console.log(props.chapters);
    let mappedArr: any = props.chapters.map((element: any, i: number) => (
      <section>
        <a href={`/reading/:${element.number}`} key={i + 1} id="chapter-link">
          {"Chapter " + element.number}
        </a>
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
