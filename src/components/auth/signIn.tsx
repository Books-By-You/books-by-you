import React, { useState } from "react";
import { connect } from "react-redux";
import { login, register } from "../../redux/reducers/userReducer";
import { Props } from "./authInterface";
import "./authView.scss";

const SignIn: React.FC<Props> = (props) => {
  const [email, setEmail] = useState("");

  return <div></div>;
};

const mapStateToProps = (state: any) => state;
const mapDispatchToProps = {
  login: login,
  register: register,
};
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
