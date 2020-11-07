import {
  SessionState,
  SessionActionTypes,
  LOGOUT,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST
} from "./types";

const initialState: SessionState = {
  loggedIn: false,
  userId: null

  //TODO
};

export function sessionReducer(
  state = initialState,
  action: SessionActionTypes
): SessionState {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state
      };
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
        userId: null
        //TODO
      };
    default:
      return state;
  }
}
