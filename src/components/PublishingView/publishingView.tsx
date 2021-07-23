import React from "react";
import { useState, useEffect } from "react";
import "./publishingView.scss";
import Button from "../Button/Button";
import axios from "axios";

const PublishingView: React.FC = () => {
  const [fileInputState, setFileInputState] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [previewSource, setPreviewSource] = useState<any>("");
  const [category, setCategory] = useState("Filter");
  // const [dropDown, setDropDown] = useState<any>({
  //   value: "Filter",
  //   category: [
  //     { id: "1", country: "Sci-Fi" },
  //     { id: "2", country: "Thriller" },
  //     { id: "3", country: "Romance" },
  //   ],
  // });
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event);
  };
  const handleFileInputChange = (e: any) => {
  const file = e.target.files[0];
    previewFile(file);
  };
  const handleChange = (e: any) => {
    console.log(e.target.value)
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
  const handleSubmitFile = (e: any) => {
    e.preventDefault();
    if (!previewSource) return;
    uploadImage(previewSource);
  };
  const uploadImage = async (base64EncodedImage: any) => {
    console.log(base64EncodedImage);
    // try{
    //   axios.get("/api/upload").then((res) => {
    //     return {res.data:base64EncodedImage}
    //   })    }catch(error){}
    try {
      await fetch("api/upload", {
        method: "POST",
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: { "Content-type": "application/json" },
      });
    } catch (error) {}
  };
  return (
    <div className="main-container">
      Publishing view
      <form onSubmit={handleSubmitFile} className="image-container">
        {/* {previewSource && (<img src={previewSource} alt="chosen book" style={{height:'300px'}}/>)} */}
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
        <input className="input1" placeholder="title input"></input>
        {/* <div className="dropdown1">
        <button className="input2">Filter</button>
              <div className="dropdown-content1">
              <a href="#">Sci-Fi</a>
                <a href="#">History</a>
                <a href="#">Thriller</a>
              </div>
              </div> */}

        <form onSubmit={handleSubmit}>
          <label>
            {/* Pick your favorite flavor: */}
            <select value={category} onChange={handleChange}>
              <option value="Filter" selected disabled hidden>Filter</option>
              <option value="Thriller">Thriller</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Romance">Romance</option>
              <option value="History">History</option>
            </select>
          </label>
          <br />
          <br />
          <label>
           
            {/* <select>
              {state.categories.map((item) => (
                <option key={item.id} value={item.country}>
                  {item.country}
                </option>
              ))}
              {console.log(state.countries)}
            </select> */}
          </label>
          {/* <input type="submit" value="Submit" /> */}
        </form>

        <input className="input3" placeholder="Add description"></input>
      </div>
      <div className="add-buttons">
        <button className="button-comp2"> Cancel </button>

        <button className="button-comp3"> Publish </button>
      </div>
    </div>
  );
};
export default PublishingView;

// import React from "react";
// import { useState, useEffect } from "react";
// import "./publishingView.scss";
// import Button from "../Button/Button";
// import axios from "axios";

// const PublishingView: React.FC = () => {
//   const [fileInputState,setFileInputState] = useState("");
//   const [selectedFile,setSelectedFile] = useState("")
//   const [previewSource,setPreviewSource] = useState<any>("")

//   const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     console.log(event);
//   };
//   const handleFileInputChange = (e:any) => {
//     const file = e.target.files[0];
//     previewFile(file);

//   }
//   const handleChange = (e:any) => {
//     const option = { value: e.target.value };
//   };
//   const previewFile = (file:any) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onloadend = ()=>{
//       setPreviewSource(reader.result);
//     }
//   }
//   const handleSubmitFile = (e:any) => {
//         e.preventDefault();
//         if(!previewSource) return;
//         uploadImage(previewSource);
//       }

//   const uploadImage = async(base64EncodedImage:any) => {
//     console.log(base64EncodedImage);
//     // try{
//     //   axios.get("/api/upload").then((res) => {
//     //     return {res.data:base64EncodedImage}
//     //   })    }catch(error){}
//       try{
//         await fetch('api/upload',{
//           method:'POST',
//           body:JSON.stringify({data: base64EncodedImage}),
//           headers: {'Content-type' : 'application/json'}
//         })
//       }catch(error){}

//   }
//   return (
//     <div className="main-container">
//       Publishing view
//       <form onSubmit={handleSubmitFile}className="image-container">
//         {/* {previewSource && (<img src={previewSource} alt="chosen book" style={{height:'300px'}}/>)} */}
//         <section className="cover-image">Cover Image {previewSource && (<img src={previewSource} alt="chosen book" style={{height:'350px',width:'450px'}}/>)}</section>

//         <input className="button-comp" type ="file" name="image" onChange={handleFileInputChange} value={fileInputState} />
//         <button className="btn" type="submit">Upload</button>
//       </form>

//       <div className="input-box">
//         <input className="input1" placeholder="title input"></input>
//         <div className="dropdown1">
//         <button className="input2">Filter</button>
//               <div className="dropdown-content1">
//               <a href="#">Sci-Fi</a>
//               <a href="#">Romance</a>
//                 <a href="#">Thriller</a>
//               </div>
//               </div>

//         <input className="input3" placeholder="Add description"></input>
//       </div>
//       <div className="add-buttons">
//       <button className="button-comp2"> Cancel </button>

//       <button className="button-comp3"> Publish </button>
//       </div>
//     </div>
//   );
// };
// export default PublishingView;
