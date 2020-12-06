export interface EncyclopediaState {
    encyclopedia: any []
    url: string,
    name: string,
    water: string [],
    sun: string[], 
    propagation: string[], 
    hardiness: string[],
    family: string,
    genus: string, 
    species: string,
    where_to_grow: string[],
    img: string,
    updatedList: boolean
};

export const GET_MATCHING_ENTRIES = "GET_MATCHING_ENTRIES";
export const GET_MATCHING_ENTRIES_SUCCESS = "GET_MATCHING_ENTRIES_SUCCESS";
export const GET_MATCHING_ENTRIES_FAIL = "GET_MATCHING_ENTRIES_FAIL";
export const SET_UPDATE_SUCCESS = "SET_UPDATE_SUCCESS";

export interface GetMatchingEntriesSuccessAction {
    type: typeof GET_MATCHING_ENTRIES_SUCCESS;
    payload: any;
  }
interface SetUpdateSuccessAction {
    type: typeof SET_UPDATE_SUCCESS;
    updatedList: boolean
}
export type EncyclopediaActionTypes = | GetMatchingEntriesSuccessAction | SetUpdateSuccessAction;