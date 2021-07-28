import React from "react";
import { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import "./chapterPublishing.scss";
import Button from "../Button/Button";
import axios from "axios";
import { connect } from "react-redux";
import { AnyARecord } from "dns";

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
  const [fileInputState, setFileInputState] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [previewSource, setPreviewSource] = useState<any>("");
  const [category, setCategory] = useState("Filter");

  const [inputs, setInputs] = useState({
    title: "",
    description: "",
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event);
  };
  const handleFileInputChange = (e: any) => {
    const file = e.target.files[0];
    previewFile(file);
  };
  const handleChange = (e: any) => {
    console.log(e.target.value);
    setCategory(e.target.value);
  };
  const previewFile = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => { 
      setPreviewSource(reader.result);
    };
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    const newBook = {
      ...inputs,
      tag: [category],
      authorID: user.userId,
      coverImage: previewSource,
    };
    console.log(newBook);
    const createdBook = await axios
      .post("/api/book", newBook)
      .then((response) => response.data);
    history.push(`/book/${createdBook._id}`);
  };

  return (
    <div className="main-container">
      <span className="chap-title">Let your Imagination Run Wild!</span>
      
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
        <input
          name="description"
          className="chap-input2"
          placeholder="Chapter Content"
          onChange={({ target }) =>
            setInputs((state) => ({ ...state, description: target.value }))
          }
          value={inputs.description}
        ></input>
      </div>
      <div className="chap-add-buttons">
        <button className="chap-button-comp2"> Cancel </button>

        <button className="chap-button-comp3" onClick={handleFormSubmit}>
          {" "}
          Publish{" "}
        </button>
      </div>
    </div>
  );
};
const mapStateToProps = (reduxState: any) => {
  return {
    user: reduxState.userReducer,
  };
};

export default connect(mapStateToProps)(PublishingView);

