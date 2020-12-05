import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
  EDIT_USER,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAIL,
  EDIT_NOTIF_TIME,
  EDIT_NOTIF_TIME_SUCCESS,
  EDIT_NOTIF_TIME_FAIL,
  EDIT_FERTILIZING_NOTIF,
  EDIT_REPOT_NOTIF,
  EDIT_WATER_NOTIF
} from "./types";

import { API_ROOT } from "../../src/constants/index";
import { Alert } from "react-native";

export const loginUser = (accessToken: string) => {
  return {
    types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL],
    payload: {
      client: "default",
      request: {
        url: `${API_ROOT}/api/users/login/`,
        method: "POST",
        data: {
          access_token: accessToken
        }
      },
      options: {
        onError({ getState, dispatch, error }) {
          try {
            if (error) {
              throw error;
            }
          } catch (e) {
            if (e.response.data.msg != null) {
              Alert.alert("Error: " + e.response.data.msg);
            }
          }
        }
      }
    }
  };
};

export const logout = () => {
  return {
    type: LOGOUT
  };
};

export const createUser = (idToken: string, accessToken: string) => {
  return {
    types: [CREATE_USER, CREATE_USER_SUCCESS, CREATE_USER_FAIL],
    payload: {
      client: "default",
      request: {
        url: `${API_ROOT}/api/users/`,
        method: "POST",
        data: {
          id_token: idToken
        }
      },
      options: {
        onSuccess: ({ dispatch }) => {
          dispatch(loginUser(accessToken));
        },
        onError({ getState, dispatch, error }) {
          try {
            if (error) {
              throw error;
            }
          } catch (e) {
            if (
              e.response.data.error != null &&
              e.response.data.error ===
                "user already exists in user profile table"
            ) {
              Alert.alert("Error: " + e.response.data.error);
            } else {
              dispatch(loginUser(accessToken));
            }
          }
        }
      }
    }
  };
};

export const editUserProfile =(username: string, zone: string, imageURI: string, userID: number) => {
  return {
    type: [EDIT_USER, EDIT_USER_SUCCESS, EDIT_USER_FAIL],
    payload: {
      client: "default",
      request: {
        url: `${API_ROOT}/api/users/${userID}/`,
        method: "PATCH",
        data: {
          username: username,
          photo: imageURI, 
          USDA_zone: zone,
        }
      },
      options: {
        onSuccess: ({ dispatch }) => {
          dispatch(setUserProfile(username, zone, imageURI));
        }
      }
    }
  };
}

export const editNotifTime = (time: string, userID: number) => {
  return {
    type: [EDIT_NOTIF_TIME, EDIT_NOTIF_TIME_SUCCESS, EDIT_NOTIF_TIME_FAIL],
    payload: {
      client: "default",
      request: {
        url: `${API_ROOT}/api/users/${userID}/`,
        method: "PATCH",
        data: {
          notif_time: time
        }
      },
      options: {
        onSuccess: ({ dispatch }) => dispatch(setNotifTime(time))
      }
    }
  };
};

export const editWaterNotif = (val: boolean, userID: number) => {
  return {
    type: EDIT_WATER_NOTIF,
    payload: {
      client: "default",
      request: {
        url: `${API_ROOT}/api/users/${userID}/`,
        method: "PATCH",
        data: {
          receive_water_notif: val
        }
      }
    }
  };
};

export const editRepotNotif = (val: boolean, userID: number) => {
  return {
    type: EDIT_REPOT_NOTIF,
    payload: {
      client: "default",
      request: {
        url: `${API_ROOT}/api/users/${userID}/`,
        method: "PATCH",
        data: {
          receive_repot_notif: val
        }
      }
    }
  };
};

export const editFertilizingNotif = (val: boolean, userID: number) => {
  return {
    type: EDIT_FERTILIZING_NOTIF,
    payload: {
      client: "default",
      request: {
        url: `${API_ROOT}/api/users/${userID}/`,
        method: "PATCH",
        data: {
          receive_fertilizing_notif: val
        }
      }
    }
  };
};

export const setUserProfile = (username: string, zone: string, imageURI: string) => {
  return {
    type: EDIT_USER_SUCCESS,
    payload: {
      username, 
      zone,
      imageURI
    }
  }
}

export const setNotifTime = (time: string) => {
  return {
    type: EDIT_NOTIF_TIME_SUCCESS,
    time
  };
};