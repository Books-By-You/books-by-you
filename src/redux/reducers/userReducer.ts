import axios from 'axios';
import {
  InitialStateInt,
  UserObj,
  ActionType,
  User,
} from './userReducerInterface';

const initialState: InitialStateInt = {
  loading: false,
  errorMessage: '',
  username: '',
  userId: '',
  profileImage: '',
  firstName: '',
  lastName: '',
};

const LOGOUT = 'logout';
const LOGIN = 'login';
const REGISTER = 'register';
const UPDATE_USER = 'update_user';

export function login(userObj: UserObj) {
  return {
    type: LOGIN,
    payload: axios.post('/api/auth/login', userObj),
  };
}

export function register(newUserObj: UserObj) {
  return {
    type: REGISTER,
    payload: axios.post('/api/auth/register', newUserObj),
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}

export function updateUser(updatedUserObj: User) {
  return {
    type: UPDATE_USER,
    payload: axios.put(`/api/users/${updatedUserObj._id}`, updatedUserObj),
  };
}

export default function reducer(state = initialState, action: ActionType) {
  switch (action.type) {
    case LOGIN + '_FULFILLED':
      return {
        ...state,
        username: action.payload.data.username,
        userId: action.payload.data._id,
        profileImage: action.payload.data.profileImage,
        firstName: action.payload.data.firstName,
        lastName: action.payload.data.lastName,
        loading: false,
      };

    case LOGIN + '_PENDING':
      return { ...state, loading: true };

    case LOGIN + '_REJECTED':
      return {
        ...state,
        loading: false,
        errorMessage: 'Incorrect login input.',
      };

    case REGISTER + '_PENDING':
      return { ...state, loading: true };

    case REGISTER + '_FULFILLED':
      return {
        ...state,
        username: action.payload.data.username,
        userId: action.payload.data._id,
        profileImage: action.payload.data.profileImage,
        firstName: action.payload.data.firstName,
        lastName: action.payload.data.lastName,
        loading: false,
      };

    case REGISTER + '_REJECTED':
      return { ...state, loading: false, errorMessage: 'User already exists' };

    case LOGOUT:
      return {
        ...state,
        username: '',
        userId: '',
        profileImage: '',
        firstName: '',
        lastName: '',
      };
    case UPDATE_USER + '_FULFILLED':
      console.log(state);
      return {
        ...state,
        username: action.payload.data.username,
        userId: action.payload.data._id,
        profileImage: action.payload.data.profileImage,
        firstName: action.payload.data.firstName,
        lastName: action.payload.data.lastName,
        loading: false,
      };

    case UPDATE_USER + '_PENDING':
      return { ...state, loading: true };

    case UPDATE_USER + '_REJECTED':
      return {
        ...state,
        loading: false,
        errorMessage: 'Unable to complete changes',
      };
    default:
      return state;
  }
}
