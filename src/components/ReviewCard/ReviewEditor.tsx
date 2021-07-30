import axios from "axios";
import React, { useState, useEffect, Props } from "react";
import { Rating } from "@material-ui/lab";
import Button from "../Button/Button";

const ReviewEditor: React.FC<{
  edit: string | number;
  content: string;
  closeModalFn: () => void;
  userId: string;
  bookId: string | undefined;
  ratings?: any;
  updateReviews: () => {};
}> = (props) => {
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState(props.userId);
  const [rating, setRating] = useState<any>(0);
  const [isEditing] = useState(props.edit);

  function editCheck() {
    if (isEditing === 0) {
      return "new review";
    } else {
      setContent(props.content);
      setAuthor(props.userId);
      let rating = props.ratings.filter((e: any) => {
        return e.userId === props.userId;
      });
      if (rating.length > 0) {
        setRating(rating[0].rating);
      }
    }
  }

  useEffect(() => {
    editCheck();
  }, []);

  function sendRateReview() {
    props.updateReviews();
    if (isEditing === 0) {
      axios
        .post("/api/bookreview", {
          review: content,
          userID: props.userId,
          bookID: props.bookId,
        })
        .then(() => {
          setContent("");
        });
      axios
        .post(`/api/bookrating/${props.bookId}`, {
          userId: props.userId,
          rating: rating,
        })
        .then(() => {
          setRating(0);
        });
      props.closeModalFn();
    } else {
      axios
        .put(`/api/bookreview/${props.edit}`, { review: content })
        .then(() => {
          setContent("");
        });
      axios
        .put(`/api/bookrating/${props.bookId}`, {
          userId: props.userId,
          rating: rating,
        })
        .then(() => {
          setRating(0);
        });
      props.closeModalFn();
    }
  }

  function deleteRateReview() {
    props.updateReviews();
    axios.delete(`/api/bookreview/${props.edit}`);
    axios.delete(``);
    props.closeModalFn();
  }

  return (
    <div>
      <article className="review-editor-container">
        <h1 className="font-lg">Rate and Review this Book!</h1>
        <Rating
          size="large"
          precision={0.5}
          defaultValue={rating}
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
        />
        <textarea
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
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
