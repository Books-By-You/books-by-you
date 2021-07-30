import React, { useEffect, useState } from "react";
import "./ReviewCard.scss";
import axios from "axios";
import Modal from "react-modal";
import ReviewEditor from "./ReviewEditor";
interface Props {
  width: string;
  _id: string;
  author: string;
  content: string;
  date: string;
  user: any;
  bookId?: string;
  ratings?: number;
  updateReviews: () => {};
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
        <div>
          <button style={{ marginRight: 10 }} onClick={openModal}>
            edit
          </button>
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
          <img />
          <h1 className="review-item">{`By- ${author}`}</h1>
          {editButton()}
          <small className="review-item">{props.date}</small>
        </article>
        <p>{props.content}</p>
      </section>
    </div>
  );
};

export default ReviewCard;
