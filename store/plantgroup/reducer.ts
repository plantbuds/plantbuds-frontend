import {
  PlantGroupState,
  PlantGroupActionTypes,
  GET_ALL_PLANTS_SUCCESS,
  GET_INDIVIDUAL_PLANT_SUCCESS,
  CREATE_PLANT_SUCCESS,
  EDIT_PLANT_SUCCESS,
  DELETE_PLANT_SUCCESS,
  SET_CREATED_PLANT,
  SET_EDITED_PLANT,
  SET_DELETED_PLANT,
  SET_EDITED_ENTRY,
  RESET_PLANT_STATE,
  GET_MATCHING_PLANTS_SUCCESS,
  SET_WATER_NOTIF,
  SET_REPOT_NOTIF,
  SET_FERTILIZE_NOTIF,
} from './types';

const initialState: PlantGroupState = {
  editedPlant: false,
  createdPlant: false,
  deletedPlant: false,
  editedEntry: false,
  plantSearchError: '',
  plants: [],
  plant_name: null,
  plant_id: null,
  nickname: null,
  photo: null,
  water_history: [],
  repot_history: [],
  fertilize_history: [],
  history: [],
  water_frequency: null,
  fertilize_frequency: null,
  repot_frequency: null,
  water_next_notif: null,
  repot_next_notif: null,
  fertilize_next_notif: null,
  notes: '',
  encyclopedia: null,
  user: null,
};

import {Alert} from 'react-native';

export function plantgroupReducer(
  state = initialState,
  action: PlantGroupActionTypes
): PlantGroupState {
  switch (action.type) {
    case GET_ALL_PLANTS_SUCCESS:
      return {
        ...state,
        plants: action.payload.data,
        plantSearchError: '',
      };
    case GET_MATCHING_PLANTS_SUCCESS:
      const matchingPlants = action.payload.data;
      if (matchingPlants) {
        if (matchingPlants.length != 0) {
          return {
            ...state,
            plantSearchError: '',
            plants: matchingPlants,
          };
        } else {
          return {
            ...state,
            plantSearchError: 'Could not find plant specified in search',
          };
        }
      } else {
        return {
          ...state,
        };
      }
    case GET_INDIVIDUAL_PLANT_SUCCESS:
      return {
        ...state,
        plant_name: action.payload.data.plant_name,
        nickname: action.payload.data.nickname,
        plant_id: parseInt(action.payload.data.url.split('/')[5]),
        photo: action.payload.data.photo,
        history: action.payload.data.history,
        water_history: action.payload.data.water_history,
        repot_history: action.payload.data.repot_history,
        fertilize_history: action.payload.data.fertilize_history,
        water_frequency: action.payload.data.water_frequency,
        repot_frequency: action.payload.data.repot_frequency,
        fertilize_frequency: action.payload.data.fertilize_frequency,
        water_next_notif: action.payload.data.water_next_notif,
        repot_next_notif: action.payload.data.repot_next_notif,
        fertilize_next_notif: action.payload.data.fertilize_next_notif,
        notes: action.payload.data.notes,
        encyclopedia: action.payload.data.encyclopedia,
        user: action.payload.data.user,
      };
    case CREATE_PLANT_SUCCESS:
      return {
        ...state,
        plant_name: action.payload.data.plant_name,
        nickname: action.payload.data.nickname,
        plant_id: parseInt(action.payload.data.url.split('/')[5]),
        photo: action.payload.data.photo,
        history: action.payload.data.history,
        water_history: action.payload.data.water_history,
        repot_history: action.payload.data.repot_history,
        fertilize_history: action.payload.data.fertilize_history,
        water_frequency: action.payload.data.water_frequency,
        repot_frequency: action.payload.data.repot_frequency,
        fertilize_frequency: action.payload.data.fertilize_frequency,
        water_next_notif: action.payload.data.water_next_notif,
        repot_next_notif: action.payload.data.repot_next_notif,
        fertilize_next_notif: action.payload.data.fertilize_next_notif,
        notes: action.payload.data.notes,
        encyclopedia: action.payload.data.encyclopedia,
        user: action.payload.data.user,
      };
    case EDIT_PLANT_SUCCESS:
      return {
        ...state,
        plant_name: action.payload.plant_name,
        nickname: action.payload.nickname,
        photo: action.payload.imageURI,
        notes: action.payload.notes,
        editedPlant: true,
      };
    case SET_EDITED_PLANT:
      return {
        ...state,
        editedPlant: action.editedPlant,
      };
    case SET_CREATED_PLANT:
      return {
        ...state,
        createdPlant: action.createdPlant,
      };
    case SET_DELETED_PLANT:
      return {
        ...state,
        deletedPlant: action.deletedPlant,
      };
    case SET_EDITED_ENTRY:
      return {
        ...state,
        editedEntry: action.editedEntry,
      };
    case SET_WATER_NOTIF:
      return {
        ...state,
        water_history: action.payload.waterArray,
      };
    case SET_REPOT_NOTIF:
      return {
        ...state,
        repot_history: action.payload.repotArray,
        repot_frequency: action.payload.frequency,
      };
    case SET_FERTILIZE_NOTIF:
      return {
        ...state,
        fertilize_history: action.payload.fertilizeArray,
      };
    case DELETE_PLANT_SUCCESS:
      return {
        ...state,
        editedPlant: false,
        createdPlant: false,
        plant_name: null,
        plant_id: null,
        nickname: null,
        photo: null,
        water_history: [],
        repot_history: [],
        fertilize_history: [],
        history: [],
        water_frequency: null,
        fertilize_frequency: null,
        repot_frequency: null,
        water_next_notif: null,
        repot_next_notif: null,
        fertilize_next_notif: null,
        notes: '',
        encyclopedia: null,
        deletedPlant: true,
      };
    case RESET_PLANT_STATE:
      return {
        ...state,
        deletedPlant: false,
        editedPlant: false,
        createdPlant: false,
        plant_name: null,
        plant_id: null,
        nickname: null,
        photo: null,
        water_history: [],
        repot_history: [],
        fertilize_history: [],
        history: [],
        water_frequency: null,
        fertilize_frequency: null,
        repot_frequency: null,
        water_next_notif: null,
        repot_next_notif: null,
        fertilize_next_notif: null,
        notes: '',
        encyclopedia: null,
      };
    default:
      return state;
  }
}
