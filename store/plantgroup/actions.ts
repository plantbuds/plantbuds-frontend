import {
  GET_ALL_PLANTS_REQUEST,
  GET_ALL_PLANTS_SUCCESS,
  GET_ALL_PLANTS_FAIL,
  GET_INDIVIDUAL_PLANT_REQUEST,
  GET_INDIVIDUAL_PLANT_SUCCESS,
  GET_INDIVIDUAL_PLANT_FAIL,
  EDIT_PLANT_PIC,
  EDIT_PLANT_PIC_FAIL,
  EDIT_PLANT_PIC_SUCCESS,
  EDIT_PLANTNAME,
  EDIT_PLANTNAME_FAIL,
  EDIT_PLANTNAME_SUCCESS,
  EDIT_NICKNAME,
  EDIT_NICKNAME_FAIL,
  EDIT_NICKNAME_SUCCESS
} from "./types";

import { API_ROOT } from "../../src/constants/index";

export const getAllPlants = (username: string) => {
  return {
    types: [
      GET_ALL_PLANTS_REQUEST,
      GET_ALL_PLANTS_SUCCESS,
      GET_ALL_PLANTS_FAIL
    ],
    payload: {
      client: "default",
      request: {
        url: `${API_ROOT}/api/plantprofile/?username=${username}`,
        method: "GET"
      }
    }
  };
};

export const getIndividualPlant = (plantID: string) => {
  return {
    types: [
      GET_INDIVIDUAL_PLANT_REQUEST,
      GET_INDIVIDUAL_PLANT_SUCCESS,
      GET_INDIVIDUAL_PLANT_FAIL,
    ],
    payload: {
      client: "default", 
      request: {
        url: `${API_ROOT}/api/plantprofile/${plantID}/`,
        method: "GET"
      }
    }
  }
}

export const editPlantPic = (imageURI: string, userID: number) => {
  return {
    type: [EDIT_PLANT_PIC, EDIT_PLANT_PIC_SUCCESS, EDIT_PLANT_PIC_FAIL],
    payload: {
      client: "default",
      request: {
        url: `${API_ROOT}/api/users/${userID}/`,
        method: "PATCH",
        data: {
          photo: imageURI
        }
      },
      options: {
        onSuccess: ({ dispatch }) => dispatch(setPlantPic(imageURI))
      }
    }
  };
};

export const editPlantName = (username: string, userID: number) => {
  return {
    type: [EDIT_PLANTNAME, EDIT_PLANTNAME_SUCCESS, EDIT_PLANTNAME_FAIL],
    payload: {
      client: "default",
      request: {
        url: `${API_ROOT}/api/users/${userID}/`,
        method: "PATCH",
        data: {
          username: username
        }
      },
      options: {
        onSuccess: ({ dispatch }) => dispatch(setPlantName(username))
      }
    }
  };
};

export const editPlantNickname = (username: string, userID: number) => {
  return {
    type: [EDIT_NICKNAME, EDIT_NICKNAME_SUCCESS, EDIT_NICKNAME_FAIL],
    payload: {
      client: "default",
      request: {
        url: `${API_ROOT}/api/users/${userID}/`,
        method: "PATCH",
        data: {
          username: username
        }
      },
      options: {
        onSuccess: ({ dispatch }) => dispatch(setPlantNickname(username))
      }
    }
  };
};


export const setPlantPic = (imageURI: string) => {
  return {
    type: EDIT_PLANT_PIC_SUCCESS,
    imageURI
  };
};

export const setPlantName = (plant_name: string) => {
  return {
    type: EDIT_PLANTNAME_SUCCESS,
    plant_name
  };
};

export const setPlantNickname = (nickname: string) => {
  return {
    type: EDIT_NICKNAME_SUCCESS,
    nickname
  }
}