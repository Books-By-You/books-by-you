import React, { useState } from "react";
interface Props {
  width: string;
  title: string;
  author: string;
  content: string;
  date: string;
}
const ReviewCard: React.FC<Props> = (props) => {
  return (
    <div style={{ width: `${props.width}` }}>
      <img />
      <section>
        <b>{props.title}</b>
        <h1>{`By ${props.author}`}</h1>
        <small>{props.date}</small>
        <p>{props.content}</p>
      </section>
    </div>
  );
};
export default ReviewCard;
