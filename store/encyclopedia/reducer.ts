import {
    EncyclopediaState,
    EncyclopediaActionTypes,
    GET_MATCHING_ENTRIES,
    GET_MATCHING_ENTRIES_SUCCESS
} from "./types";

const initialState: EncyclopediaState = {
    encyclopedia: [],
    url: null,
    name: null,
    water: [],
    sun: [], 
    propagation: [], 
    hardiness: [],
    family: null,
    genus: null, 
    species: null,
    where_to_grow: [],
    img: null
  };

export function encyclopediaReducer(
    state = initialState,
    action: EncyclopediaActionTypes
  ): EncyclopediaState {
    switch (action.type) {
      case GET_MATCHING_ENTRIES_SUCCESS:
        return {
          ...state,
          encyclopedia: action.payload.data
        }
      default:
        return state;
    }
  }