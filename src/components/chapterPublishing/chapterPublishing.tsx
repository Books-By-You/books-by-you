import React from "react";
import { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import "./chapterPublishing.scss";
import Button from "../Button/Button";
import axios from "axios";
import { connect } from "react-redux";
import { AnyARecord } from "dns";
import { useLocation } from "react-router";

interface User {
  userId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  profileImage: string;
}

const PublishingView: React.FC<{ user: User }> = ({ user }) => {
  const history = useHistory();
  const location = useLocation();
  const bookIdFromPath = location.pathname.split("/")[2];
  const [fileInputState, setFileInputState] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [previewSource, setPreviewSource] = useState<any>("");
  const [category, setCategory] = useState("Filter");
  const [inputs, setInputs] = useState({
    title: "",
    content: "",
  });

  // const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   console.log(event);
  // };

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    const newBook = {
      ...inputs,
      id: bookIdFromPath,
    };
    console.log("newBook", newBook);
    const response = await axios.post("/api/chapter", newBook);
    const { _id } = response.data;
    console.log("response", response);
    if (response.data._id) {
      history.push(`/book/${_id}`);
    }
  };
  const resetInputField = () => {
    setInputs({ ...inputs, title: " ", content: " " });
  };
  return (
    <section className="container-center">
      <div className="main-container">
        <span className="chap-publishing-title">
          Let your Imagination Run Wild!
        </span>

        <div className="input-box">
          <span className="chap-title2">Enter Chapter Title</span>
          <input
            name="title"
            className="chap-input1"
            placeholder="title "
            onChange={({ target }) =>
              setInputs((state) => ({ ...state, title: target.value }))
            }
            value={inputs.title}
          />

          <span className="chap-title2">Chapter Content</span>
          <textarea
            name="content"
            className="chap-input2"
            placeholder="Chapter Content"
            value={inputs.content}
            onChange={({ target }) =>
              setInputs((state) => ({ ...state, content: target.value }))
            }
            rows={18}
            cols={50}
          />
        </div>
        <div className="chap-add-buttons">
          {/* <button className="chap-button-comp2" onClick={resetInputField}>Cancel </button> */}
          <Button
            label="Clear"
            styleName="chap-clear"
            handleClick={resetInputField}
          />
          {/* <button className="chap-button-comp3" onClick={handleFormSubmit}>
          {" "}
          Publish{" "}
        </button> */}
          <Button
            label="Publish"
            styleName="button-publish"
            handleClick={handleFormSubmit}
          />
        </div>
      </div>
    </section>
  );
};
const mapStateToProps = (reduxState: any) => {
  return {
    user: reduxState.userReducer,
  };
};

export default connect(mapStateToProps)(PublishingView);
