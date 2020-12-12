import {
  SessionState,
  SessionActionTypes,
  LOGOUT,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  EDIT_USER_SUCCESS,
  EDIT_NOTIF_SUCCESS,
} from './types';

const initialState: SessionState = {
  loggedIn: false,
  userID: null,
  profileURI: null,
  username: null,
  email: null,
  USDA_zone: null,
  receive_water_notif: false,
  receive_repot_notif: false,
  receive_fertilizing_notif: false,
};

export function sessionReducer(state = initialState, action: SessionActionTypes): SessionState {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        userID: action.payload.data.id,
        profileURI: action.payload.data.photo,
        username: action.payload.data.username,
        email: action.payload.data.email,
        USDA_zone: action.payload.data.USDA_zone,
        receive_water_notif: action.payload.data.receive_water_notif,
        receive_repot_notif: action.payload.data.receive_water_notif,
        receive_fertilizing_notif: action.payload.data.receive_fertilizing_notif,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loggedIn: false,
      };
    case LOGOUT:
      return {
        ...state,
        loggedIn: false,
        userID: null,
        username: null,
        USDA_zone: null,
        profileURI: null,
        email: null,
        receive_fertilizing_notif: false,
        receive_water_notif: false,
        receive_repot_notif: false,
      };
    case EDIT_USER_SUCCESS:
      return {
        ...state,
        username: action.payload.username,
        USDA_zone: action.payload.zone,
        profileURI: action.payload.imageURI,
      };
    case EDIT_NOTIF_SUCCESS: 
      return {
        ...state, 
        receive_water_notif: action.payload.receive_water_notif,
        receive_repot_notif: action.payload.receive_repot_notif,
        receive_fertilizing_notif: action.payload.receive_fertilizing_notif
      }
    default:
      return state;
  }
}
