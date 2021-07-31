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
    <section className="chapter-publishing-section">
      <div className="chapter-publishing-container">
        <p id="imagination">Let your Imagination Run Wild!</p>
        <div className="chapter-publishing-label-div" id="chapter-title-container">
          <label className="chapter-publishing-label" htmlFor="chapter-title">
            Chapter Title:
          </label>
          <textarea
            name="title"
            id="chapter-title"
            placeholder="title "
            onChange={({ target }) =>
              setInputs((state) => ({ ...state, title: target.value }))
            }
            value={inputs.title}
          />
        </div>
        <div className="chapter-publishing-label-div" id="chapter-content-container">
          <label className="chapter-publishing-label" htmlFor="chapter-content">
            Chapter Content:
          </label>
          <textarea
            name="content"
            id="chapter-content"
            placeholder="Chapter Content"
            value={inputs.content}
            onChange={({ target }) =>
              setInputs((state) => ({ ...state, content: target.value }))
            }
          />
        </div>
      </div>
      <div className="chapter-buttons-container">
        <button className="chapter-pub-buttons" onClick={resetInputField}>Clear</button>
        <button className="chapter-pub-buttons" onClick={handleFormSubmit}>Publish</button>
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
