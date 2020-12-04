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
  EDIT_NICKNAME_SUCCESS,
  CREATE_PLANT,
  CREATE_PLANT_FAIL,
  CREATE_PLANT_SUCCESS,
  SET_CREATED_PLANT,
  SET_EDITED_PLANT,
  EDIT_NOTES,
  EDIT_NOTES_SUCCESS,
  EDIT_NOTES_FAIL,
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

export const createPlant = (userID: number, username: string) => {
  return {
    types: [
      CREATE_PLANT, CREATE_PLANT_SUCCESS, CREATE_PLANT_FAIL
    ],
    payload: {
      client: "default",
      request: {
        url: `${API_ROOT}/api/plantprofile/`,
        method: "POST",
        data: {
          user: `${API_ROOT}/api/users/${userID}/`
        }
      }, 
    }
  };
}

export const editPlantPic = (imageURI: string, userID: number) => {
  return {
    type: [EDIT_PLANT_PIC, EDIT_PLANT_PIC_SUCCESS, EDIT_PLANT_PIC_FAIL],
    payload: {
      client: "default",
      request: {
        url: `${API_ROOT}/api/plantprofile/${userID}/`,
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

export const editPlantName = (plantname: string, userID: number) => {
  return {
    type: [EDIT_PLANTNAME, EDIT_PLANTNAME_SUCCESS, EDIT_PLANTNAME_FAIL],
    payload: {
      client: "default",
      request: {
        url: `${API_ROOT}/api/plantprofile/${userID}/`,
        method: "PATCH",
        data: {
          plant_name: plantname
        }
      },
      options: {
        onSuccess: ({ dispatch }) => dispatch(setPlantName(plantname))
      }
    }
  };
};

export const editPlantNickname = (nickname: string, userID: number) => {
  return {
    type: [EDIT_NICKNAME, EDIT_NICKNAME_SUCCESS, EDIT_NICKNAME_FAIL],
    payload: {
      client: "default",
      request: {
        url: `${API_ROOT}/api/plantprofile/${userID}/`,
        method: "PATCH",
        data: {
          nickname: nickname
        }
      },
      options: {
        onSuccess: ({ dispatch }) => dispatch(setPlantNickname(nickname))
      }
    }
  };
};

export const editNotes = (notes: string, userID: number) => {
  return {
    type: [EDIT_NOTES, EDIT_NOTES_SUCCESS, EDIT_NOTES_FAIL],
    payload: {
      client: "default",
      request: {
        url: `${API_ROOT}/api/plantprofile/${userID}/`,
        method: "PATCH",
        data: {
          notes: notes
        }
      },
      options: {
        onSuccess: ({ dispatch }) => dispatch(setNotes(notes))
      }
    }
  };
}

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

export const setNotes = (notes: string) => {
  return {
    type: EDIT_NOTES_SUCCESS,
    notes
  }
}

export const setEditedPlant = (editedPlant: boolean) => {
  return {
    type: SET_EDITED_PLANT,
    editedPlant
  }
}

export const setCreatedPlant = (createdPlant: boolean) => {
  return {
    type: SET_CREATED_PLANT,
    createdPlant
  }
}

export const setGetPlant = (getPlant: boolean) => {
  return {
    type: SET_CREATED_PLANT,
    getPlant
  }
}