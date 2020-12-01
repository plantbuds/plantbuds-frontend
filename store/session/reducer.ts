import { ActionSheetIOS } from "react-native";
import {
  SessionState,
  SessionActionTypes,
  LOGOUT,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  EDIT_PFP,
  EDIT_PFP_SUCCESS,
  EDIT_USERNAME_SUCCESS,
  EDIT_ZONE_SUCCESS,
} from "./types";

const initialState: SessionState = {
  loggedIn: false,
  userID: null,
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
        userID: action.payload.data.id,
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
        userID: null,
        username: null,
        USDA_zone: null,
        profileURI: null,
        //TODO
      };
    case EDIT_PFP_SUCCESS:
      return {
        ...state,
        profileURI: action.imageURI,
      };
    case EDIT_USERNAME_SUCCESS:
      return {
        ...state,
        username: action.username,
      };
    case EDIT_ZONE_SUCCESS: 
    return {
      ...state,
      USDA_zone: parseInt(action.zone),
    };
    default:
      return state;
  }
}
