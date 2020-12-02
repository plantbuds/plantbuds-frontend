import {
    PlantGroupState,
    PlantGroupActionTypes,
    GET_ALL_PLANTS_SUCCESS,
} from "./types";

const initialState: PlantGroupState = {
    plants: [], 
    plant_name: null,
    plant_id: null,
    nickname: null, 
    photo: null,
    water_history: [],
    repot_history: [],
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
    default: 
    return state
  }
}