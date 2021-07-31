import React, { useEffect, useState } from "react";
import "./ReviewCard.scss";
import axios from "axios";
import Modal from "react-modal";
import ReviewEditor from "./ReviewEditor";
import Button from "../Button/Button";

interface Props {
  width: string;
  _id: string;
  author: string;
  content: string;
  date: string;
  user: any;
  bookId?: string;
  ratings?: number | any;
  updateReviews: () => void;
}

const ReviewCard: React.FC<Props> = (props) => {
  const [owner, setOwner] = useState(false);
  const [author, setAuthor] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  let modalStyle = {
    overlay: {},
    content: { width: "900px", height: "600px", margin: "auto" },
  };

  let ownerCheck = () => {
    if (props.author === props.user) {
      setOwner(true);
    }
  };
  let getAuthor = () => {
    axios.get(`/api/users/${props.author}`).then((res) => {
      setAuthor(res.data.username);
    });
  };

  useEffect(() => {
    getAuthor();
    if (props.user) {
      ownerCheck();
    }
  }, []);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  let editButton = () => {
    if (owner) {
      return (
        <div className="edit">
          <Button
            label="Edit"
            styleName="review-buttons"
            handleClick={openModal}
          />

          <Modal
            style={modalStyle}
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
          >
            <ReviewEditor
              updateReviews={props.updateReviews}
              bookId={props.bookId}
              userId={props.user}
              edit={props._id}
              closeModalFn={closeModal}
              content={props.content}
              ratings={props.ratings}
            />
          </Modal>
        </div>
      );
    }
  };

  return (
    <div className="review-container" style={{ width: `${props.width}` }}>
      <section className="review-body">
        <article>
          <h1 className="review-item">{`By- ${author}`}</h1>

          <small className="review-item2">{props.date}</small>
        </article>
        <p>{props.content}</p>
        {editButton()}
      </section>
    </div>
  );
};

export default ReviewCard;
