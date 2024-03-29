import React, { useState } from "react";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";
import ReviewEditor from "../ReviewCard/ReviewEditor";
import Modal from "react-modal";
Modal.setAppElement("#root");
const OwnerControl: React.FC<{
  owner: boolean;
  userId: string;
  bookId: string;
  userReducer: any;
  ratings: any;
  updateReviews: () => void;
}> = (props) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  let history = useHistory();
  let modalStyle = {
    overlay: {},
    content: { width: "900px", height: "600px", margin: "auto" },
  };

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  let myRating = props.ratings.filter((e: any) => {
    return e.userId === props.userId;
  });
  function reviewCheck() {
    if (props.userId) {
      console.log(myRating);
      if (myRating.length === 0) {
        return (
          <Button
            styleName={"review-buttons"}
            label={"Write Review"}
            handleClick={() => {
              openModal();
            }}
          />
        );
      }
    }
  }

  return (
    <section>
      {props.owner ? (
        <div>
          <Button
            styleName={"review-buttons"}
            label={"Delete"}
            handleClick={() => {
              axios.delete(`/api/book/${props.bookId}`).then(() => {
                history.push("/login");
              });
            }}
          />
          <Button
            styleName={"review-buttons"}
            label={"Edit Book"}
            handleClick={() => {
              history.push({
                pathname: "/publishing",
                state: { bookId: props.bookId },
              });
            }}
          />
          <Button
            styleName={"review-buttons"}
            label={"Add Chapter"}
            handleClick={() => {
              history.push(`/book/${props.bookId}/new-chapter`);
            }}
          />
        </div>
      ) : (
        <section>
          <Link to="/login">
            <Button
              styleName={"review-buttons"}
              label={"Add to Bookshelf"}
              handleClick={() => {
                axios.post(`/api/bookshelf/${props.bookId}`, {
                  userId: props.userReducer.userId,
                });
              }}
            />
          </Link>
          {reviewCheck()}
        </section>
      )}

      <Modal
        style={modalStyle}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
        <ReviewEditor
          updateReviews={props.updateReviews}
          bookId={props.bookId}
          userId={props.userId}
          content={""}
          edit={0}
          closeModalFn={closeModal}
        ></ReviewEditor>
      </Modal>
    </section>
  );
};

export default OwnerControl;
