import {
    PlantGroupState,
    PlantGroupActionTypes,
    GET_ALL_PLANTS_SUCCESS,
    GET_INDIVIDUAL_PLANT_SUCCESS,
} from "./types";

const initialState: PlantGroupState = {
    plants: [], 
    plant_name: null,
    plant_id: null,
    nickname: null, 
    photo: null,
    water_history: [],
    repot_history: [],
    fertilize_history: [],
    water_frequency: null,
    fertilize_frequency: null,
    repot_frequency: null,
    water_next_notif: null,
    repot_next_notif: null,
    fertilize_next_notif: null,
    notes: [],
    encyclopedia: null,
    userLink: null,
  };

  export function plantgroupReducer(
    state = initialState,
    action: PlantGroupActionTypes
  ):PlantGroupState {
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
        photo: action.payload.data.photo,
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
        userLink: action.payload.data.user,
    }
    default: 
    return state
  }
}