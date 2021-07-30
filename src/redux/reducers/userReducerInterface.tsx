export interface InitialStateInt {
  loading: boolean;
  registerErrorMessage: string;
  loginErrorMessage: string;
  username: string;
  userId: string;
  profileImage: string;
  firstName: string;
  lastName: string;
}
export type UserObj = {
  key: string;
};

export type ActionType = {
  type: string;
  payload: any;
};

export interface User {
  _id: string;
  profileImage: string;
  username: string;
  password: string;
  confirmPassword: string;
}
