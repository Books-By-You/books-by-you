export interface InitialStateInt {
  loading: boolean;
  errorMessage: string;
  username: string;
  userId: number;
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
