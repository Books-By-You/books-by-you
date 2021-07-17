import React, { useState } from 'react';
import { connect } from 'react-redux';
import { login, register } from '../../redux/reducers/userReducer';
import { Props } from './authInterface';
import { Redirect } from 'react-router-dom';
import './authView.scss';

const AuthView: React.FC<Props> = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [error, setError] = useState('');
  const [styles, setStyles] = useState({
    signUpStyle: ' background-shift',
    inpHiddenSignUp: ' hidden',
    descHiddenSignUp: 'desc-style',
    loginStyle: '',
    inpHiddenLogin: '',
    descHiddenLogin: 'hidden',
  });

  function passwordCheck() {
    if (confirmPassword !== password) {
      setError('Passwords do not match!');
    } else {
      props.register({
        email: email,
        password: password,
        username: username,
        name1: name1,
        name2: name2,
      });
    }
  }
  function signUpSwapper() {
    setStyles({
      signUpStyle: ' background-shift',
      inpHiddenSignUp: ' hidden',
      descHiddenSignUp: 'desc-style',
      loginStyle: '',
      inpHiddenLogin: '',
      descHiddenLogin: 'hidden',
    });
    console.log('hit sign-up swap');
  }
  function loginSwapper() {
    console.log('hit login swap');
    setStyles({
      signUpStyle: '',
      inpHiddenSignUp: ' ',
      descHiddenSignUp: 'hidden',
      loginStyle: ' background-shift',
      inpHiddenLogin: ' hidden',
      descHiddenLogin: 'desc-style',
    });
  }
  if (props.userReducer.username) {
    return <Redirect to={`/profile/${props.userReducer.userId}`} />;
  }
  let passColorSwitch = props.errorMessage ? 'inp-red' : 'inp-blck',
    passwordCheckerColor = error ? 'inp-red' : 'inp-blck';
  return (
    <div className='auth-container'>
      <section
        onClick={signUpSwapper}
        className={`login-container${styles.loginStyle}`}
      >
        <h1 id='sign-in'>Sign In</h1>
        <h1 className={styles.descHiddenLogin}>
          Already have an acount? Login here!
        </h1>
        <input
          className={`inp-blck${styles.inpHiddenLogin}`}
          placeholder='Username'
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          className={passColorSwitch + styles.inpHiddenLogin}
          placeholder='Password'
          type='password'
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <section>
          <button
            className={`login-button ${styles.inpHiddenLogin}`}
            onClick={() =>
              props.login({ username: username, password: password })
            }
          >
            Login
          </button>
        </section>
        <h2 className={`${styles.inpHiddenLogin}`}>
          {props.userReducer.errorMessage}
        </h2>
        <h1 className={`newPassword${styles.inpHiddenLogin}`}>
          Forgot your password?
        </h1>
      </section>

      <section
        onClick={loginSwapper}
        className={`sign-up-container ${styles.signUpStyle}`}
      >
        <h1>Sign up</h1>
        <h1 className={styles.descHiddenSignUp}>Join our community!</h1>
        <input
          className={`inp-blck${styles.inpHiddenSignUp}`}
          placeholder='Email'
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          className={passwordCheckerColor + styles.inpHiddenSignUp}
          placeholder='Password'
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input
          className={passwordCheckerColor + styles.inpHiddenSignUp}
          placeholder='Confirm Password'
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
        <input
          className={`inp-blck${styles.inpHiddenSignUp}`}
          placeholder='Username'
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          className={`inp-blck${styles.inpHiddenSignUp}`}
          placeholder='First Name'
          onChange={(e) => {
            setName1(e.target.value);
          }}
        />
        <input
          className={`inp-blck${styles.inpHiddenSignUp}`}
          placeholder='Last Name'
          onChange={(e) => {
            setName2(e.target.value);
          }}
        />
        <section>
          <button
            className={`login-button--new${styles.inpHiddenSignUp}`}
            onClick={() => passwordCheck()}
          >
            Create account
          </button>
        </section>
        <h1 id='error' className={styles.inpHiddenSignUp}>
          {error}
        </h1>
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
