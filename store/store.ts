import { createStore, combineReducers, applyMiddleware } from "redux";
import axios from "axios";
import axiosMiddleware from "redux-axios-middleware";
import { sessionReducer } from "./session/reducer";
import { API_ROOT } from "../src/constants/index";

const client = axios.create({
  //all axios can be used, shown in axios documentation
  baseURL: API_ROOT,
  responseType: "json"
});

const rootReducer = combineReducers({
  session: sessionReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const store = createStore(
    rootReducer,
    applyMiddleware(axiosMiddleware(client))
  );

  return store;
}
