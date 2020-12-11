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
  UPDATE_WATER_NOTIF,
  UPDATE_WATER_NOTIF_SUCCESS,
  UPDATE_WATER_NOTIF_FAIL,
  UPDATE_FERTILIZE_NOTIF,
  UPDATE_FERTILIZE_NOTIF_FAIL,
  UPDATE_FERTILIZE_NOTIF_SUCCESS,
  UPDATE_REPOT_NOTIF,
  UPDATE_REPOT_NOTIF_FAIL,
  UPDATE_REPOT_NOTIF_SUCCESS,
  SET_WATER_NOTIF,
  SET_FERTILIZE_NOTIF,
  SET_REPOT_NOTIF,
} from './types';

import {API_ROOT, BASIC_TOKEN} from '../../src/constants/index';

export const getAllPlants = (username: string) => {
  return {
    types: [GET_ALL_PLANTS_REQUEST, GET_ALL_PLANTS_SUCCESS, GET_ALL_PLANTS_FAIL],
    payload: {
      client: 'default',
      request: {
        url: `${API_ROOT}/api/plantprofile/?username=${username}`,
        headers: {
          Authorization: 'Basic ' + BASIC_TOKEN,
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
          Authorization: 'Basic ' + BASIC_TOKEN,
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
          Authorization: 'Basic ' + BASIC_TOKEN,
        },
        method: 'GET',
      },
    },
  };
};

export const createPlant = (
  userID: number,
  imageURI = 'http://i.imgur.com/4os1ZjY.png',
  plant_name = 'Scientific Name',
  nickname = 'My Plant',
  notes = ''
) => {
  return {
    types: [CREATE_PLANT, CREATE_PLANT_SUCCESS, CREATE_PLANT_FAIL],
    payload: {
      client: 'default',
      request: {
        url: `${API_ROOT}/api/plantprofile/`,
        headers: {
          Authorization: 'Basic ' + BASIC_TOKEN,
        },
        method: 'POST',
        data: {
          plant_name: plant_name,
          photo: imageURI,
          nickname: nickname,
          history: [],
          water_frequency: 0,
          repot_frequency: 0,
          fertilize_frequency: 0,
          notes: notes,
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
          Authorization: 'Basic ' + BASIC_TOKEN,
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
          Authorization: 'Basic ' + BASIC_TOKEN,
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
          Authorization: 'Basic ' + BASIC_TOKEN,
        },
        method: 'PATCH',
        data: {
          history: history,
        },
      },
    },
  };
};

export const updateWaterNotif = (
  waterHistory: string[],
  frequency: number,
  notifDate: Date,
  stringID: string,
  plantID: number
) => {
  return {
    type: [UPDATE_WATER_NOTIF, UPDATE_WATER_NOTIF_SUCCESS, UPDATE_WATER_NOTIF_FAIL],
    payload: {
      client: 'default',
      request: {
        url: `${API_ROOT}/api/plantprofile/${plantID}/`,
        headers: {
          Authorization: 'Basic ' + BASIC_TOKEN,
        },
        method: 'PATCH',
        data: {
          water_history: waterHistory,
          water_frequency: frequency,
          water_next_notif: notifDate,
          water_notif_id: stringID, 
        },
      },
      options: {
        onSuccess({dispatch}) {
          dispatch(setWaterNotif(waterHistory, frequency, notifDate, stringID));
        },
      },
    },
  };
};

export const updateRepotNotif = (
  repotHistory: string[],
  frequency: number,
  plantID: number
) => {
  return {
    type: [UPDATE_REPOT_NOTIF, UPDATE_REPOT_NOTIF_SUCCESS, UPDATE_REPOT_NOTIF_FAIL],
    payload: {
      client: 'default',
      request: {
        url: `${API_ROOT}/api/plantprofile/${plantID}/`,
        headers: {
          Authorization: 'Basic ' + BASIC_TOKEN,
        },
        method: 'PATCH',
        data: {
          repot_history: repotHistory,
          repot_frequency: frequency,
        },
      },
      options: {
        onSuccess({dispatch}) {
          dispatch(setRepotNotif(repotHistory, frequency));
        },
      },
    },
  };
};

export const updateFertilizeNotif = (
  fertilizeHistory: string[],
  frequency: number,
  plantID: number
) => {
  return {
    type: [UPDATE_FERTILIZE_NOTIF, UPDATE_FERTILIZE_NOTIF_SUCCESS, UPDATE_FERTILIZE_NOTIF_FAIL],
    payload: {
      client: 'default',
      request: {
        url: `${API_ROOT}/api/plantprofile/${plantID}/`,
        headers: {
          Authorization: 'Basic ' + BASIC_TOKEN,
        },
        method: 'PATCH',
        data: {
          fertilize_history: fertilizeHistory,
          fertilize_frequency: frequency,
        },
      },
      options: {
        onSuccess({dispatch}) {
          dispatch(setFertilizeNotif(fertilizeHistory, frequency));
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

export const setWaterNotif = (waterArray: string[], frequency: number, notifDate: Date, stringID: string) => {
  return {
    type: SET_WATER_NOTIF,
    payload: {
      waterArray,
      frequency,
      notifDate, 
      stringID
    },
  };
};

export const setFertilizeNotif = (fertilizeArray: string[], frequency: number) => {
  return {
    type: SET_FERTILIZE_NOTIF,
    payload: {
      fertilizeArray,
      frequency,
    },
  };
};

export const setRepotNotif = (repotArray: string[], frequency: number) => {
  return {
    type: SET_REPOT_NOTIF,
    payload: {
      repotArray,
      frequency,
    },
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
