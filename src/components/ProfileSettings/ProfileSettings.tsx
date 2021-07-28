import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import './ProfileSettings.scss';

interface User {
  userId: string;
  firstName: string;
  lastName: string;
  username: string;
  profileImage: string;
}

const ProfileSettings: React.FC<{
  handleClose: () => void;
  open: boolean;
  user: User;
}> = ({ handleClose, open, user }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [passMatch, setPassMatch] = useState<boolean>();
  const [userInfo, setUserInfo] = useState({
    profileImage: user.profileImage,
    username: user.username,
    password: '',
    confirmPassword: '',
  });

  const onSubmit = async () => {
    setLoading(true);
    const response = await axios
      .put(`/api/users/${user.userId}`, userInfo)
      .then((res) => res.data);
    setMessage(response);
    setLoading(false);
    setTimeout(() => {
      handleClose();
    }, 1000);
  };

  useEffect(() => {
    userInfo.password === userInfo.confirmPassword
      ? setPassMatch(false)
      : setPassMatch(true);
  }, [userInfo.confirmPassword, userInfo.password]);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Profile Settings</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can update your email and/or password here
          </DialogContentText>
          <TextField
            autoFocus
            value={userInfo.profileImage}
            margin='dense'
            id='profileImage'
            label='Profile Image URL'
            type='profileImage'
            onChange={({ target }) =>
              setUserInfo((state) => ({ ...state, profileImage: target.value }))
            }
            fullWidth
          />
          <TextField
            value={userInfo.username}
            margin='dense'
            id='username'
            label='Username'
            type='username'
            onChange={({ target }) =>
              setUserInfo((state) => ({ ...state, username: target.value }))
            }
            fullWidth
          />
          <TextField
            value={userInfo.password}
            margin='dense'
            id='password'
            label='Password'
            type='password'
            onChange={({ target }) =>
              setUserInfo((state) => ({ ...state, password: target.value }))
            }
            fullWidth
          />
          <TextField
            value={userInfo.confirmPassword}
            margin='dense'
            id='confirmPassword'
            label='Confirm Password'
            type='password'
            onChange={({ target }) =>
              setUserInfo((state) => ({
                ...state,
                confirmPassword: target.value,
              }))
            }
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          {passMatch && <p style={{ color: 'red' }}>Password does not match</p>}
          {loading ? <p>Loading...</p> : message && <p>{message}</p>}
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={onSubmit} color='primary' disabled={passMatch}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const mapStateToProps = (reduxState: any) => {
  return {
    user: reduxState.userReducer,
  };
};

export default connect(mapStateToProps)(ProfileSettings);
