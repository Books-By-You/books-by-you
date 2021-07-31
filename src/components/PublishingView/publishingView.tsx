import React from "react";
import { useState, useEffect, useCallback } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./publishingView.scss";
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

const PublishingView: React.FC<{ user: User }> = (props) => {
  const { user } = props;
  const location = useLocation<any>();
  const { state: locationState } = location;
  let bookId = "";
  if (locationState) {
    bookId = locationState.bookId;
  }
  const editingBook = bookId ? true : false;
  const history = useHistory();
  const [fileInputState, setFileInputState] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [previewSource, setPreviewSource] = useState<any>("");
  const [category, setCategory] = useState("Filter");
  const [editing, setEditing] = useState(false);
  const [bookToEdit, setBookToEdit] = useState({
    _id: "",
    title: "",
    tags: [],
    ratings: 0,
    authorID: "",
    description: "",
    coverImage: "",
    chapters: [],
  });

  const [inputs, setInputs] = useState({
    title: "",
    description: "",
  });

  // const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   console.log(event);
  // };
  const handleFileInputChange = (e: any) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const handleChange = (e: any) => {
    // console.log(e.target.value);
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
    // console.log(newBook);
    const createdBook = await axios
      .post("/api/book", newBook)
      .then((response) => response.data);
    // history.push(`/book/${createdBook._id}`);
    history.push(`/book/${createdBook._id}/new-chapter`);
  };

  const submitEdit = async () => {
    let requestObj = { ...inputs, coverImage: previewSource, tags: [category] };
    await axios
      .put(`/api/book/${bookId}`, requestObj)
      .then((res) => {
        console.log({ resData: res.data });
        return res.data;
      })
      .catch((err) => console.log(err));
  };

  const resetInputField = () => {
    setFileInputState("");
    setSelectedFile("");
    setPreviewSource("");
    setInputs({ ...inputs, title: " ", description: " " });
    setCategory("Filter");
  };

  async function startEditing() {
    if (location.state) {
      await axios.get(`/api/book/${location.state.bookId}`).then((res) => {
        console.log({ resData: res.data });
        setBookToEdit(res.data);
        setEditing(true);
        setPreviewSource(res.data.coverImage);
        setCategory(res.data.tags[0]);
      });
    }
  }

  useEffect(() => {
    startEditing();
  }, []);

  useEffect(() => {
    setInputs({
      title: bookToEdit.title,
      description: bookToEdit.description,
    });
  }, [bookToEdit]);

  return (
    <div className="main-container">
      <div className="main-section image-editing-container">
        <div className="image-container">
          <section className="cover-image-container">
            {previewSource ? (
              <img
                src={previewSource}
                alt="chosen book"
                className="cover-image"
              />
            ) : (
              <div
                className="placeholder-image cover-image"
              >
                <p className="publishing-label">Upload Cover Image</p>
              </div>
            )}
            <input
              type="file"
              name="image"
              title=" "
              onChange={handleFileInputChange}
              value={fileInputState}
              className="book-pub-file-button custom-file-input"
              
            />
          </section>
        </div>
        <div className="book-contents-container">
          <div className="book-content">
          <label className="publishing-label"htmlFor="filter">Book Genre:</label>
              <select id="filter" value={category} onChange={handleChange}>
                <option value="Filter" selected disabled hidden>
                  Select Genre
                </option>
                <option value="Fantasy">Fantasy</option>
                <option value="Science Fiction">Science Fiction</option>
                <option value="Romance">Romance</option>
                <option value="Non Fiction">Non Fiction</option>
              </select>
            <label className="publishing-label" htmlFor="title-input">Book Title:</label>
            <textarea
              name="title"
              id="title-input"
              className="textarea"
              placeholder="Add title"
              onChange={({ target }) =>
                setInputs((state) => ({ ...state, title: target.value }))
              }
              value={inputs.title}
            />
            <label className="publishing-label" htmlFor="description-input">Book Description</label>
            <textarea
              name="description"
              id="description-input"
              className="textarea"
              placeholder="Add description"
              onChange={({ target }) =>
                setInputs((state) => ({ ...state, description: target.value }))
              }
              value={inputs.description}
            />
          </div>

          <div className="buttons-container">
              <button className="book-pub-buttons" onClick={resetInputField}>{`Clear`}</button>
                {editingBook ? (
                  <button
                  className="book-pub-buttons" onClick={() => submitEdit()}>Save</button>
                ) : (
                  <button 
                  className="book-pub-buttons" onClick={handleFormSubmit}>{` Next `}</button>
                )}
            </div>


        </div>
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
