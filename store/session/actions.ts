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
  EDIT_NOTIF,
  EDIT_NOTIF_SUCCESS,
  EDIT_NOTIF_FAIL,
  
} from './types';

import {API_ROOT, BASIC_TOKEN} from '../../src/constants/index';
import {Alert} from 'react-native';

export const loginUser = (accessToken: string) => {
  return {
    types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL],
    payload: {
      client: 'default',
      request: {
        url: `${API_ROOT}/api/users/login/`,
        headers: {
          Authorization: `Basic ${BASIC_TOKEN}`,
        },
        method: 'POST',
        data: {
          access_token: accessToken,
        },
      },
      options: {
        onError({getState, dispatch, error}) {
          try {
            if (error) {
              throw error;
            }
          } catch (e) {
            if (e.response.data.msg != null) {
              Alert.alert('Error: ' + e.response.data.msg);
            }
          }
        },
      },
    },
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT,
  };
};

export const createUser = (idToken: string, accessToken: string) => {
  return {
    types: [CREATE_USER, CREATE_USER_SUCCESS, CREATE_USER_FAIL],
    payload: {
      client: 'default',
      request: {
        url: `${API_ROOT}/api/users/`,
        headers: {
          Authorization: `Basic ${BASIC_TOKEN}`,
        },
        method: 'POST',
        data: {
          id_token: idToken,
        },
      },
      options: {
        onSuccess: ({dispatch}) => {
          dispatch(loginUser(accessToken));
        },
        onError({getState, dispatch, error}) {
          try {
            if (error) {
              throw error;
            }
          } catch (e) {
            if (
              e.response.data.error != null &&
              e.response.data.error === 'user already exists in user profile table'
            ) {
              dispatch(loginUser(accessToken));
            }
          }
        },
      },
    },
  };
};

export const editUserProfile = (
  username: string,
  zone: string,
  imageURI: string,
  userID: number
) => {
  return {
    type: [EDIT_USER, EDIT_USER_SUCCESS, EDIT_USER_FAIL],
    payload: {
      client: 'default',
      request: {
        url: `${API_ROOT}/api/users/${userID}/`,
        headers: {
          Authorization: `Basic ${BASIC_TOKEN}`,
        },
        method: 'PATCH',
        data: {
          username: username,
          photo: imageURI,
          USDA_zone: zone,
        },
      },
      options: {
        onSuccess: ({dispatch}) => {
          dispatch(setUserProfile(username, zone, imageURI));
        },
      },
    },
  };
};

export const editNotif = (waterVal: boolean, repotVal: boolean, fertilizeVal: boolean, userID: number) => {
  return {
    type: [EDIT_NOTIF, EDIT_NOTIF_SUCCESS, EDIT_NOTIF_FAIL],
    payload: {
      client: 'default',
      request: {
        url: `${API_ROOT}/api/users/${userID}/`,
        headers: {
          Authorization: `Basic ${BASIC_TOKEN}`,
        },
        method: 'PATCH',
        data: {
          receive_water_notif: waterVal,
          receive_repot_notif: repotVal,
          receive_fertilizing_notif: fertilizeVal,
        },
      },
      options: {
        onSuccess: ({dispatch}) => {
          dispatch(setNotif(waterVal, repotVal, fertilizeVal));
        },
      },
    },
  };
};

export const setUserProfile = (username: string, zone: string, imageURI: string) => {
  return {
    type: EDIT_USER_SUCCESS,
    payload: {
      username,
      zone,
      imageURI,
    },
  };
};

export const setNotif = ( receive_water_notif: boolean,
  receive_repot_notif: boolean, receive_fertilizing_notif: boolean) => {
  return {
    type: EDIT_NOTIF_SUCCESS,
    payload: {
      receive_water_notif,
      receive_repot_notif,
      receive_fertilizing_notif
    }
  };
};
