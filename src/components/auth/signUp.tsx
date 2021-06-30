import React, { useState } from "react";
import { connect } from "react-redux";
import { login, register } from "../../redux/reducers/userReducer";
import { Props } from "./authInterface";
import "./authView.scss";

const SignUp: React.FC<Props> = (props) => {
  const [email, setEmail] = useState("");

  return <div></div>;
};

const mapStateToProps = (state: any) => state;
const mapDispatchToProps = {
  login: login,
  register: register,
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
