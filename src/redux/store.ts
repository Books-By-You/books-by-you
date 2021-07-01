import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import promiseMiddleware from "redux-promise-middleware";
import userReducer from "./reducers/userReducer";

const rootReducer = combineReducers({
  userReducer,
});

export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(promiseMiddleware))
);
