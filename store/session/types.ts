export interface SessionState {
  loggedIn: boolean;
  userID: number;
  profileURI: string;
  username: string, 
  email: string, 
  USDA_zone: string, 
  receive_water_notif: boolean,
  receive_repot_notif: boolean, 
  receive_fertilizing_notif: boolean,
  notif_time: string
  //TODO add more fields for session reducer state
}

export interface JSONObject {
  id: number;
  username: string;
  email: string;
  //TODO add any more additional fields depending on what backend gives us.
}

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT = "LOGOOUT";
export const CREATE_USER = "CREATE_USER";
export const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS";
export const CREATE_USER_FAIL = "CREATE_USER_FAIL";
export const SET_PROFILE_IMAGE = "SET_PROFILE_IMAGE";
export const EDIT_USER = "EDIT_USER";
export const EDIT_USER_SUCCESS = "EDIT_USER_SUCCESS";
export const EDIT_USER_FAIL = "EDIT_USER_FAIL";
export const EDIT_NOTIF_TIME = "EDIT_NOTIF_TIME";
export const EDIT_NOTIF_TIME_SUCCESS = "EDIT_NOTIF_TIME_SUCCESS";
export const EDIT_NOTIF_TIME_FAIL = "EDIT_NOTIF_TIME_FAIL";
export const EDIT_WATER_NOTIF = "EDIT_WATER_NOTIF";
export const EDIT_REPOT_NOTIF = "EDIT_REPOT_NOTIF";
export const EDIT_FERTILIZING_NOTIF = "EDIT_FERTILIZING_NOTIF";

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

interface EditUserSuccessAction {
  type: typeof EDIT_USER_SUCCESS;
  payload: any;
}
interface EditNotifTimeSuccessAction {
  type: typeof EDIT_NOTIF_TIME_SUCCESS;
  time: string;
}
export type SessionActionTypes =
  | LoginRequestAction
  | LoginSuccessAction
  | LogoutAction
  | LoginFailAction
  | EditUserSuccessAction
  | EditNotifTimeSuccessAction;
