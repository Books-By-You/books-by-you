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
          <button onClick={openModal}>edit</button>
          <Modal
            style={modalStyle}
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
          >
            <ReviewEditor edit={props._id} closeModalFn={closeModal} />
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
          <h1 className="review-item">{`By-${author}`}</h1>
          {editButton()}
          <small className="review-item">{props.date}</small>
        </article>
        <p>{props.content}</p>
      </section>
    </div>
  );
};

export default ReviewCard;
