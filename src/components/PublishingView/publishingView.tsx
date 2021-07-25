import React from "react";
import { useState, useEffect ,useCallback } from "react";
import { useHistory } from 'react-router-dom';
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

const PublishingView: React.FC<{ user: User }> = ({ user }) => {
  const history = useHistory();
  const [fileInputState, setFileInputState] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [previewSource, setPreviewSource] = useState<any>("");
  const [category, setCategory] = useState("Filter");

  const [inputs,setInputs] = useState({
    title: '',
    description: ''
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
  // const handleSubmitFile = (e: any) => {
  //   e.preventDefault();
  //   if (!previewSource) return;
  //   uploadImage(previewSource);
  // };  
  // const uploadImage = async (base64EncodedImage: any) => {
  //   console.log(base64EncodedImage);
  //   axios.post('/api/upload',{ data: base64EncodedImage }).then((res)=>{console.log(res.data)}).catch ((error)=> error)

  //   try {
  //     await fetch("api/upload", {
  //       method: "POST",
  //       body: JSON.stringify({ data: base64EncodedImage }),
  //       headers: { "Content-type": "application/json" },
  //     });
  //   } catch (error) {}
  //  };
  

  const handleFormSubmit = async (e: any) => {
    e.preventDefault()
    const newBook = {
      ...inputs,
      tags: [category],
      userId: user.userId,
      coverImage: previewSource
    }
    const createdBook = await axios.post('/api/book', newBook).then(response => response.data)
    history.push(`/book/${createdBook._id}`)
  }

  return (
    <div className="main-container">
      Publishing view
      <form onSubmit={()=>{}} className="image-container">
        <section className="cover-image">
          Cover Image{" "}
          {previewSource && (
            <img
              src={previewSource}
              alt="chosen book"
              style={{ height: "350px", width: "450px" }}
            />
          )}
        </section>

        <input
          className="button-comp"
          type="file"
          name="image"
          onChange={handleFileInputChange}
          value={fileInputState}
        />
        <button className="btn" type="submit">
          Upload
        </button>
      </form>
      <div className="input-box">
        <input name='title' className="input1" placeholder="title input" onChange={({target}) => setInputs(state => ({...state,title:target.value}))} value={inputs.title}></input>

        <form onSubmit={handleSubmit}>
          <label>
            <select className="filter" value={category} onChange={handleChange}>
              <option value="Filter" selected disabled hidden>
                Filter
              </option>
              <option value="Thriller">Thriller</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Romance">Romance</option>
              <option value="History">History</option>
            </select>
          </label>
          <br />
          <br />
          <label></label>
        </form>

        <input name='description' className="input3" placeholder="Add description" onChange={({target}) => setInputs(state => ({...state,description:target.value}))} value={inputs.description}></input>
      </div>
      <div className="add-buttons">
        <button className="button-comp2"> Cancel </button>

        <button className="button-comp3" onClick={handleFormSubmit}> Create </button>
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

