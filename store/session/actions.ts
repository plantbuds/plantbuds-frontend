import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  EDIT_PFP,
  EDIT_PFP_SUCCESS,
  EDIT_PFP_FAIL,
  CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
  SET_PROFILE_IMAGE
} from "./types";

import { API_ROOT } from "../../src/constants/index";
import { Alert } from "react-native";
import { signInWithGoogleAsync } from "../../src/utils/GoogleOAuth";

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
            Alert.alert("Error: " + e.response.data.msg);
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
        onSuccess: async ({ dispatch }) => {
          dispatch(loginUser(accessToken));
        },
        onError({ getState, dispatch, error }) {
          try {
            if (error) {
              throw error;
            }
          } catch (e) {
            if (e.response.data.error === 'user already exists in user profile table') {
              dispatch(loginUser(accessToken));
            }
            else {
              Alert.alert("Error: " + e.response.data.error);
            }
          }
        }
      }
    }
  };
};

export const editProfilePic = (imageURI: string, userID: number) => {
  return {
    type: [EDIT_PFP, EDIT_PFP_SUCCESS, EDIT_PFP_FAIL],
    payload: {
      client: "default",
      request: {
        url: `${API_ROOT}/users/${userID}`,
        method: "PATCH",
        data: {
          //TODO
        }
      },
      options: {
        onSuccess: ({ dispatch }) => {
          // set the new pfp locally
          dispatch(setProfileImage);
          console.log("successfully updated pfp");
        },
        onError: () => console.log("failed to update pfp")
      }
    }
  };
};

export const setProfileImage = (imageURI: string) => {
  return {
    type: SET_PROFILE_IMAGE,
    imageURI
  };
};
