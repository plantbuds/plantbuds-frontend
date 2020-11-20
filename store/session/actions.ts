import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  EDIT_PFP,
  EDIT_PFP_SUCCESS,
  EDIT_PFP_FAIL,
  CREATE_USER,
  SET_PROFILE_IMAGE
} from "./types";

import { API_ROOT } from "../../src/constants/index";

export const loginUser = (accessToken: string) => {
  return {
    types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL],
    payload: {
      client: "default",
      request: {
        url: `${API_ROOT}/users/`,
        method: "POST",
        data: {
          access_token: accessToken
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
        onSuccess: ({dispatch}) => {
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
    }
}
