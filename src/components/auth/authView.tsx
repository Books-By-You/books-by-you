import React, { useState } from "react";
import { connect } from "react-redux";
import { login, register } from "../../redux/reducers/userReducer";
import { Props } from "./authInterface";
import "./authView.scss";

const AuthView: React.FC<Props> = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [error, setError] = useState("");

  let signUpStyle = "",
    inpHiddenSignUp = "",
    descHiddenSignUp = "",
    loginStyle = "",
    inpHiddenLogin = "",
    descHiddenLogin = "";

  function passwordCheck() {
    if (confirmPassword !== password) {
      setError("Passwords do not match!");
    } else {
      props.register({
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        username: username,
        name1: name1,
        name2: name2,
      });
    }
  }
  // function signUpSwapper() {
  //   console.log("hit sign-up swap");
  //   signUpStyle = "";
  //   loginStyle = " background-shift";
  //   inpHiddenLogin = " hidden";
  //   inpHiddenSignUp = "";
  // }
  // function loginSwapper() {
  //   console.log("hit login swap");
  //   loginStyle = "";
  //   signUpStyle = " background-shift";
  //   inpHiddenSignUp = " hidden";
  //   inpHiddenLogin = "";
  //}
  let passColorSwitch = props.errorMessage ? "inp-red" : "inp-blck",
    passwordCheckerColor = error ? "inp-red" : "inp-blck";
  return (
    <div className="auth-container">
      <section className={`login-container${loginStyle}`}>
        <h1>Sign In</h1>
        <input
          className={`inp-blck${inpHiddenLogin}`}
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          className={passColorSwitch + inpHiddenLogin}
          placeholder="Password"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <section>
          <button
            className={`login-button${inpHiddenLogin}`}
            onClick={() => props.login({ email: email, password: password })}
          >
            Login
          </button>
        </section>
        <h2 className={`${loginStyle}`}>{props.errorMessage}</h2>
        <h1 id={`newPassword${inpHiddenLogin}`}>Forgot your password?</h1>
      </section>

      <section className={`sign-up-container${signUpStyle}`}>
        <h1>Sign up</h1>
        <input
          className={`inp-blck${inpHiddenSignUp}`}
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          className={passwordCheckerColor + inpHiddenSignUp}
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input
          className={passwordCheckerColor + inpHiddenSignUp}
          placeholder="Confirm Password"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
        <input
          className={`inp-blck${inpHiddenSignUp}`}
          placeholder="Username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          className={`inp-blck${inpHiddenSignUp}`}
          placeholder="First Name"
          onChange={(e) => {
            setName1(e.target.value);
          }}
        />
        <input
          className={`inp-blck${inpHiddenSignUp}`}
          placeholder="Last Name"
          onChange={(e) => {
            setName2(e.target.value);
          }}
        />
        <section>
          <button
            className={`login-button--new${inpHiddenSignUp}`}
            onClick={() => passwordCheck()}
          >
            Create account
          </button>
        </section>
        <h1 id="error">{error}</h1>
      </section>
    </div>
  );
};

const mapStateToProps = (state: any) => state;
const mapDispatchToProps = {
  login: login,
  register: register,
};
export default connect(mapStateToProps, mapDispatchToProps)(AuthView);
