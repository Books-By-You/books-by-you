import axios from "axios";
import React, { useState, useEffect } from "react";
import { Rating } from "@material-ui/lab";
import Button from "../Button/Button";

const ReviewEditor: React.FC<{
  edit: string | number;
  closeModalFn: () => void;
}> = (props) => {
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState("");
  const [isEditing] = useState(props.edit);

  function editCheck() {
    if (isEditing === 0) {
      return "new review";
    } else {
      axios
        .get(`/api/bookreview/${props.edit}`)
        .then((res) => {
          setContent(res.data.content);
        })
        .catch((err) => err);
      axios
        .get(`/api/bookrating/${props.edit}`)
        .then((res) => {
          setRating(res.data.rating);
        })
        .catch((err) => err);
    }
  }
  useEffect(() => {
    editCheck();
  }, []);

  function sendRateReview() {
    axios.post("/api/idk", { content: content, rating: rating }).then(() => {
      setContent("");
      setRating("");
    });
    props.closeModalFn();
  }

  function deleteRateReview() {
    axios.delete(`/api/bookreview/${props.edit}`);
    props.closeModalFn();
  }

  return (
    <div>
      <article className="review-editor-container">
        <h1 className="font-lg">Rate and Review this Book!</h1>
        <Rating size="large" precision={0.5} />
        <textarea
          className="review-input"
          rows={18}
          cols={50}
          placeholder="Write a Review"
        />
      </article>
      <section className="review-submit">
        <Button
          styleName="delete-review"
          label="Delete"
          handleClick={deleteRateReview}
        />
        <Button
          styleName="submit-review"
          label="Submit"
          handleClick={sendRateReview}
        />
      </section>
    </div>
  );
};

export default ReviewEditor;
