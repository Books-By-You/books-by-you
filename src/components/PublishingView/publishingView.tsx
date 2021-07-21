import React from "react";
import { useState, useEffect } from "react";
import "./publishingView.scss";
import Button from "../Button/Button";

const PublishingView: React.FC = () => {
  return (
    <div className="main-container">
      Publishing view
      <div className="image-container">
        <section className="cover-image">Cover Image</section>
        <input className="button-comp" type ="file"/> 
       
      </div>
      <div className="input-box">
        <input className="input1" placeholder="title input"></input>
        <div className="dropdown1">
        <button className="input2">Filter</button>
              <div className="dropdown-content1">
                <a href="#">Sci-Fi</a>
                <a href="#">Romance</a>
                <a href="#">Thriller</a>
              </div>
              </div>
        <input className="input3" placeholder="Add description"></input>
      </div>
      <div className="add-buttons">
      <button className="button-comp2"> Cancel </button>
      
      <button className="button-comp2"> Publish </button>
      </div>
    </div>
  );
};
export default PublishingView;
