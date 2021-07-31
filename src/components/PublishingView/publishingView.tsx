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
  const {user} = props
  const location = useLocation<any>();
  const { state: locationState } = location;
  let bookId = '';
  if(locationState) {
    bookId = locationState.bookId
  }
  const editingBook = bookId ? true : false
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
  })

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
    let requestObj = {...inputs, coverImage: previewSource, tags: [category]}
    await axios.put(`/api/book/${bookId}`, requestObj ).then(res => {
      console.log({resData:res.data})
      return res.data
    }).catch(err => console.log(err))
  }

  const resetInputField = () => {
    setFileInputState("");
    setSelectedFile("");
    setPreviewSource("");
    setInputs({ ...inputs, title: " ", description: " " });
    setCategory("Filter");
  };
  
   async function startEditing(){
    if(location.state){
      await axios.get(`/api/book/${location.state.bookId}`).then(res => {
        console.log({resData: res.data})
        setBookToEdit(res.data)
        setEditing(true)
        setPreviewSource(res.data.coverImage)
        setCategory(res.data.tags[0])
      })
    }
  }
   
  useEffect(() => {
    startEditing()
  },[])

  useEffect(() => {
    setInputs({
      title: bookToEdit.title,
      description: bookToEdit.description
    })
  }, [bookToEdit])
  
  console.log({selectedFile, previewSource})
  return (
    <div className="main-container">
      <div className = "publishing-title">
        {editing ? <>Edit-Your-Book</> : <>Create-A-Book</> }
      </div>
      
      <form onSubmit={() => {}} className="image-container">
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
        
      </form>
      <div className="input-box">
        <input
          name="title"
          className="input1"
          placeholder="title input"
          onChange={({ target }) =>
            setInputs((state) => ({ ...state, title: target.value }))
          }
          value={inputs.title}
        ></input>

        <form onSubmit={handleSubmit}>
          <label>
            <select className="filter" value={category} onChange={handleChange}>
              <option value="Filter" selected disabled hidden>
                Genre
              </option>
              <option value="Fantasy">Fantasy</option>
              <option value="Science Fiction">Science Fiction</option>
              <option value="Romance">Romance</option>
              <option value="Non Fiction">Non Fiction</option>
            </select>
          </label>
          <br />
          <br />
          <label></label>
        </form>

        <input
          name="description"
          className="input3"
          placeholder="Add description"
          onChange={({ target }) =>
            setInputs((state) => ({ ...state, description: target.value }))
          }
          value={inputs.description}
        ></input>
      </div>
      <div className="add-buttons">
       
        <Button 
              label="Clear"
              styleName="button-clear"
              handleClick={resetInputField}
            />

        { editingBook ? 
        <button onClick={() => submitEdit()}>Save</button>
           : <Button 
           label="Next >>"
           styleName="button-chapter"
           handleClick={handleFormSubmit}
       />
          
        }
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
