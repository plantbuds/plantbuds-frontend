export interface SessionState {
  loggedIn: boolean;
  userId: number;
  profileURI: string;
  //TODO add more fields for session reducer state
}

export interface JSONObject {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  last_login: number;
  date_joined: number;
  //TODO add any more additional fields depending on what backend gives us.
}

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT = "LOGOOUT";
export const CREATE_USER = "CREATE_USER";
export const SET_PROFILE_IMAGE = "SET_PROFILE_IMAGE";
export const EDIT_PFP = "EDIT_PFP";
export const EDIT_PFP_SUCCESS = "EDIT_PFP_SUCCESS";
export const EDIT_PFP_FAIL = "EDIT_PFP_FAIL";

interface LoginRequestAction {
  type: typeof LOGIN_REQUEST;
  payload: JSONObject;
}

interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: any;
}
interface LogoutAction {
  type: typeof LOGOUT;
}

interface LoginFailAction {
  type: typeof LOGIN_FAIL;
  payload: any;
}

interface SetProfileImageAction {
  type: typeof SET_PROFILE_IMAGE;
  imageURI: string;
}

export type SessionActionTypes =
  | LoginRequestAction
  | LoginSuccessAction
  | LogoutAction
  | LoginFailAction
  | SetProfileImageAction;
