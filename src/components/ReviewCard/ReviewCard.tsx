import React, { useState } from "react";
import "./ReviewCard.scss";
interface Props {
  width: string;
  title: string;
  author: string;
  content: string;
  date: string;
}
const ReviewCard: React.FC<Props> = (props) => {
  return (
    <div className="review-container" style={{ width: `${props.width}` }}>
      <section className="review-body">
        <article>
          <img />
          <b className="review-item">{props.title}</b>
          <h1 className="review-item">{`By-${props.author}`}</h1>
          <small className="review-item">{props.date}</small>
        </article>
        <p>{props.content}</p>
      </section>
    </div>
  );
};
export default ReviewCard;
