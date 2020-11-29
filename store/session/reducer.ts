import { ActionSheetIOS } from "react-native";
import {
  SessionState,
  SessionActionTypes,
  LOGOUT,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  EDIT_PFP,
  EDIT_PFP_SUCCESS,
  EDIT_PFP_FAIL,
  SET_PROFILE_IMAGE,
  LOGIN_REQUEST
} from "./types";

const initialState: SessionState = {
  loggedIn: false,
  userId: null,
  profileURI: null, 
  username: null, 
  email: null, 
  USDA_zone: null, 
  receive_water_notif: null,
  receive_repot_notif: null, 
  receive_fertilizing_notif: null,
  notif_time: null
  //TODO
};

export function sessionReducer(
  state = initialState,
  action: SessionActionTypes
): SessionState {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        userId: action.payload.data.id,
        profileURI: action.payload.data.photo,
        username: action.payload.data.username,
        email: action.payload.data.email,
        //TODO
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loggedIn: false
        //TODO
      };
    case LOGOUT:
      return {
        ...state,
        loggedIn: false,
        userId: null,
        profileURI: null,
        //TODO
      };
    case SET_PROFILE_IMAGE:
      return {
        ...state,
        profileURI: action.imageURI,
      };
    default:
      return state;
  }
}
