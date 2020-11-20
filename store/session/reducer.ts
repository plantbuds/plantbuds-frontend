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
        loggedIn: true
        //TODO
      };
    case LOGIN_FAIL:
      return {
        ...state
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
