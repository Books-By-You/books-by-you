import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { login, register } from "../redux/reducers/userReducer";

interface Props {
  loading: boolean;
  errorMessage: string;
  username: string;
  userId: number;
  profileImage: string;
  firstName: string;
  lastName: string;
}

function AuthView(props: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      {`${props.username}`}
      hello
    </div>
  );
}

const mapStateToProps = (state: Props) => state;
const mapDispatchToProps = {
  login: login,
  register: register,
};
export default connect(mapStateToProps, mapDispatchToProps)(AuthView);
