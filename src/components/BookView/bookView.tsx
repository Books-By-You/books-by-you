import React, { useState } from "react";
import { connect } from "react-redux";
import { Props } from "../auth/authInterface";

const BookView: React.FC<Props> = (props) => {
  const [bookId, setBookId] = useState(props.match.params.id);
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState(0);
  return (
    <div>
      <section>
        <img></img>
        <section>book info box</section>
      </section>
      <section>page turning buttons or something</section>
      <section></section>
    </div>
  );
};
const mapStateToProps = (state: any) => state;
export default connect(mapStateToProps, null)(BookView);
