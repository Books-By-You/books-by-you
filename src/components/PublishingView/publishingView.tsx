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
        <button className="button-comp"> upload
       </button>
      </div>
      <div className="input-box">
        <input className="input1" placeholder="title input"></input>
        <button className="input2">Filter</button>
              <div className="dropdown-content">
                <a href="#">Link 1</a>
                <a href="#">Link 2</a>
                <a href="#">Link 3</a>
              </div>
      </div>
      <div className="add-buttons">
      <button className="button-comp2"> cancel </button>
      <button className="button-comp2"> Add Chapter </button>
      <button className="button-comp2"> Publish </button>
      </div>
    </div>
  );
};
export default PublishingView;
