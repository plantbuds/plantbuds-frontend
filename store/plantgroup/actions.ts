import {
  GET_ALL_PLANTS_REQUEST,
  GET_ALL_PLANTS_SUCCESS,
  GET_ALL_PLANTS_FAIL,
  GET_MATCHING_PLANTS,
  GET_MATCHING_PLANTS_FAIL,
  GET_MATCHING_PLANTS_SUCCESS,
  GET_INDIVIDUAL_PLANT_REQUEST,
  GET_INDIVIDUAL_PLANT_SUCCESS,
  GET_INDIVIDUAL_PLANT_FAIL,
  CREATE_PLANT,
  CREATE_PLANT_FAIL,
  CREATE_PLANT_SUCCESS,
  DELETE_PLANT,
  DELETE_PLANT_FAIL,
  DELETE_PLANT_SUCCESS,
  SET_DELETED_PLANT,
  SET_CREATED_PLANT,
  SET_EDITED_PLANT,
  SET_EDITED_ENTRY,
  UPDATE_TASK_HISTORY,
  UPDATE_TASK_HISTORY_FAIL,
  UPDATE_TASK_HISTORY_SUCCESS,
  EDIT_PLANT,
  EDIT_PLANT_FAIL,
  EDIT_PLANT_SUCCESS,
  RESET_PLANT_STATE,
  SEND_WATER_NOTIF,
} from './types';

import {API_ROOT, BASIC_TOKEN} from '../../src/constants/index';
import {getExpoToken} from '../../src/utils/AsyncStorage';

export const getAllPlants = (username: string) => {
  return {
    types: [GET_ALL_PLANTS_REQUEST, GET_ALL_PLANTS_SUCCESS, GET_ALL_PLANTS_FAIL],
    payload: {
      client: 'default',
      request: {
        url: `${API_ROOT}/api/plantprofile/?username=${username}`,
        headers: {
          "Authorization": "Basic " + BASIC_TOKEN
        },
        method: 'GET',
      },
    },
  };
};

export const getIndividualPlant = (plantID: number) => {
  return {
    types: [GET_INDIVIDUAL_PLANT_REQUEST, GET_INDIVIDUAL_PLANT_SUCCESS, GET_INDIVIDUAL_PLANT_FAIL],
    payload: {
      client: 'default',
      request: {
        url: `${API_ROOT}/api/plantprofile/${plantID}/`,
        headers: {
          "Authorization": "Basic " + BASIC_TOKEN
        },
        method: 'GET',
      },
    },
  };
};

export const getMatchingPlants = (searchterm: string, username: string) => {
  return {
    types: [GET_MATCHING_PLANTS, GET_MATCHING_PLANTS_SUCCESS, GET_MATCHING_PLANTS_FAIL],
    payload: {
      client: 'default',
      request: {
        url: `${API_ROOT}/api/plantprofile/?username=${username}&search=${searchterm}`,
        headers: {
          "Authorization": "Basic " + BASIC_TOKEN
        },
        method: 'GET',
      },
      options: {
        onError({getState, dispatch, error}) {
          try {
            if (error) {
              throw error;
            }
          } catch (e) {
            if (e.response.data.msg != null) {
              console.log('Error: ' + e.response.data.msg);
            }
          }
        },
      },
    },
  };
};

export const createPlant = (
  userID: number,
  imageURI = 'http://i.imgur.com/4os1ZjY.png',
  plant_name = 'Scientific Name',
  nickname = 'My Plant'
) => {
  return {
    types: [CREATE_PLANT, CREATE_PLANT_SUCCESS, CREATE_PLANT_FAIL],
    payload: {
      client: 'default',
      request: {
        url: `${API_ROOT}/api/plantprofile/`,
        headers: {
          "Authorization": "Basic " + BASIC_TOKEN
        },
        method: 'POST',
        data: {
          plant_name: plant_name,
          photo: imageURI,
          nickname: nickname,
          history: [],
          water_frequency: '1',
          repot_frequency: '1',
          fertilize_frequency: '1',
          notes: '',
          user: `${API_ROOT}/api/users/${userID}/`,
        },
      },
    },
  };
};

export const deletePlant = (plantID: number) => {
  return {
    types: [DELETE_PLANT, DELETE_PLANT_SUCCESS, DELETE_PLANT_FAIL],
    payload: {
      client: 'default',
      request: {
        url: `${API_ROOT}/api/plantprofile/${plantID}/`,
        headers: {
          "Authorization": "Basic " + BASIC_TOKEN
        },
        method: 'DELETE',
      },
    },
  };
};

export const editPlantProfile = (
  plantID: number,
  imageURI: string,
  plant_name: string,
  nickname: string,
  notes: string
) => {
  return {
    type: [EDIT_PLANT, EDIT_PLANT_SUCCESS, EDIT_PLANT_FAIL],
    payload: {
      client: 'default',
      request: {
        url: `${API_ROOT}/api/plantprofile/${plantID}/`,
        headers: {
          "Authorization": "Basic " + BASIC_TOKEN
        },
        method: 'PATCH',
        data: {
          plant_name: plant_name,
          photo: imageURI,
          nickname: nickname,
          notes: notes,
        },
      },
      options: {
        onSuccess: ({dispatch}) => {
          dispatch(setPlantProfile(imageURI, plant_name, nickname, notes));
        },
      },
    },
  };
};

export const updateTaskHistory = (history: string[], plantID: number) => {
  return {
    type: [UPDATE_TASK_HISTORY, UPDATE_TASK_HISTORY_SUCCESS, UPDATE_TASK_HISTORY_FAIL],
    payload: {
      client: 'default',
      request: {
        url: `${API_ROOT}/api/plantprofile/${plantID}/`,
        headers: {
          "Authorization": "Basic " + BASIC_TOKEN
        },
        method: 'PATCH',
        data: {
          history: history,
        },
      },
    },
  };
};

export const setEditedPlant = (editedPlant: boolean) => {
  return {
    type: SET_EDITED_PLANT,
    editedPlant,
  };
};

export const setCreatedPlant = (createdPlant: boolean) => {
  return {
    type: SET_CREATED_PLANT,
    createdPlant,
  };
};

export const setDeletedPlant = (deletedPlant: boolean) => {
  return {
    type: SET_DELETED_PLANT,
    deletedPlant,
  };
};

export const setEditedEntry = (editedEntry: boolean) => {
  return {
    type: SET_EDITED_ENTRY,
    editedEntry,
  };
};

export const setPlantProfile = (
  imageURI: string,
  plant_name: string,
  nickname: string,
  notes: string
) => {
  return {
    type: EDIT_PLANT_SUCCESS,
    payload: {
      imageURI,
      plant_name,
      nickname,
      notes,
    },
  };
};

export const resetPlantState = () => {
  return {
    type: RESET_PLANT_STATE,
  };
};
