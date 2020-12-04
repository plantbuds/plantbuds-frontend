import {
  PlantGroupState,
  PlantGroupActionTypes,
  GET_ALL_PLANTS_SUCCESS,
  GET_INDIVIDUAL_PLANT_SUCCESS,
  EDIT_PLANTNAME_SUCCESS,
  EDIT_PLANT_PIC_SUCCESS,
  CREATE_PLANT_SUCCESS,
  SET_CREATED_PLANT,
  SET_EDITED_PLANT,
  SET_DELETED_PLANT,
  EDIT_NOTES_SUCCESS,
  EDIT_NICKNAME_SUCCESS,
  DELETE_PLANT_SUCCESS,
  SET_EDITED_ENTRY
} from "./types";

const initialState: PlantGroupState = {
  editedPlant: false,
  createdPlant: false,
  deletedPlant: false,
  editedEntry: false,
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
  notes: "",
  encyclopedia: null,
  user: null
};

export function plantgroupReducer(
  state = initialState,
  action: PlantGroupActionTypes
): PlantGroupState {
  switch (action.type) {
    case GET_ALL_PLANTS_SUCCESS:
      return {
        ...state,
        plants: action.payload.data
      };
    case GET_INDIVIDUAL_PLANT_SUCCESS:
      return {
        ...state,
        plant_name: action.payload.data.plant_name,
        nickname: action.payload.data.nickname,
        plant_id: parseInt(action.payload.data.url.split("/")[5]),
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
        user: action.payload.data.user
      };
    case CREATE_PLANT_SUCCESS:
      return {
        ...state,
        plant_name: action.payload.data.plant_name,
        nickname: action.payload.data.nickname,
        plant_id: parseInt(action.payload.data.url.split("/")[5]),
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
    case EDIT_NICKNAME_SUCCESS:
      return {
        ...state,
        nickname: action.nickname,
        editedPlant: true
      };
    case EDIT_PLANT_PIC_SUCCESS:
      return {
        ...state,
        photo: action.imageURI,
        editedPlant: true
      };
    case EDIT_PLANTNAME_SUCCESS:
      return {
        ...state,
        plant_name: action.plant_name,
        editedPlant: true
      };
    case SET_EDITED_PLANT:
      return {
        ...state,
        editedPlant: action.editedPlant
      };
    case EDIT_NOTES_SUCCESS:
      return {
        ...state,
        notes: action.notes
      };
    case SET_CREATED_PLANT:
      return {
        ...state,
        createdPlant: action.createdPlant
      };
    case SET_DELETED_PLANT:
      return {
        ...state,
        deletedPlant: action.deletedPlant
      };
    case SET_EDITED_ENTRY:
      return {
        ...state,
        editedEntry: action.editedEntry
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
        notes: "",
        encyclopedia: null,
        deletedPlant: true
      };
    default:
      return state;
  }
}
