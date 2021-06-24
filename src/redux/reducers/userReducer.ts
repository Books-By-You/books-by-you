import axios, { AxiosResponse } from "axios";

interface InitialState {
  loading: boolean;
  errorMessage: string;
  username: string;
  userId: number;
  profileImage: string;
  firstName: string;
  lastName: string;
}
type UserObj = {
  username: string;
  password: string;
};
type Action = {
  type: string;
  payload: any;
};

const initialState: InitialState = {
  loading: false,
  errorMessage: "",
  username: "kelsey",
  userId: 0,
  profileImage: "",
  firstName: "",
  lastName: "",
};

const LOGOUT = "logout";
const LOGIN = "login";
const REGISTER = "register";

export function login(userObj: UserObj) {
  return {
    type: LOGIN,
    payload: axios.post("/api/auth/login", userObj),
  };
}

export function register(userObj: UserObj) {
  return {
    type: REGISTER,
    payload: axios.post("/api/auth/register", userObj),
  };
}

export function logout() {
  return {
    type: LOGOUT,
    payload: "logged out",
  };
}

export default function reducer(state = initialState, action: Action) {
  switch (action.type) {
    case LOGIN + "_FULFILLED":
      return {
        ...state,
        username: action.payload.data.username,
        userId: action.payload.data.userId,
        profileImage: action.payload.data.profileImage,
        loading: false,
      };

    case LOGIN + "_PENDING":
      return { ...state, loading: true };

    case LOGIN + "_REJECTED":
      return {
        ...state,
        loading: false,
        errorMessage: "Incorrect login input.",
      };

    case REGISTER + "_PENDING":
      return { ...state, loading: true };

    case REGISTER + "_FULFILLED":
      return {
        ...state,
        username: action.payload.data.username,
        userId: action.payload.data.userId,
        loading: false,
      };

    case REGISTER + "_REJECTED":
      return { ...state, loading: false, errorMessage: "User already exists" };

    case LOGOUT:
      return { ...state, ...initialState };
    default:
      return state;
  }
}
