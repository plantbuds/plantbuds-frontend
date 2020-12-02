export interface SessionState {
  loggedIn: boolean;
  userID: number;
  profileURI: string;
  username: string, 
  email: string, 
  USDA_zone: number, 
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
export const EDIT_PFP = "EDIT_PFP";
export const EDIT_PFP_SUCCESS = "EDIT_PFP_SUCCESS";
export const EDIT_PFP_FAIL = "EDIT_PFP_FAIL";
export const EDIT_USERNAME = "EDIT_USERNAME";
export const EDIT_USERNAME_SUCCESS = "EDIT_USERNAME_SUCCESS";
export const EDIT_USERNAME_FAIL = "EDIT_USERNAME_FAIL";
export const EDIT_ZONE = "EDIT_ZONE";
export const EDIT_ZONE_SUCCESS = "EDIT_ZONE_SUCCESS";
export const EDIT_ZONE_FAIL = "EDIT_ZONE_FAIL";
export const EDIT_NOTIF_TIME = "EDIT_NOTIF_TIME";
export const EDIT_NOTIF_TIME_SUCCESS = "EDIT_NOTIF_TIME_SUCCESS";
export const EDIT_NOTIF_TIME_FAIL = "EDIT_NOTIF_TIME_FAIL";

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

interface EditPFPSuccessAction {
  type: typeof EDIT_PFP_SUCCESS;
  imageURI: string;
}

interface EditUsernameSuccessAction {
  type: typeof EDIT_USERNAME_SUCCESS;
  username: string
}

interface EditZoneSuccessAction {
  type: typeof EDIT_ZONE_SUCCESS;
  zone: string;
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
  | EditPFPSuccessAction
  | EditUsernameSuccessAction
  | EditZoneSuccessAction
  | EditNotifTimeSuccessAction;
