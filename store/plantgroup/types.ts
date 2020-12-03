export interface PlantGroupState {
  plants: any[];
  plant_name: string;
  plant_id: string;
  nickname: string;
  photo: string;
  water_history: string[];
  repot_history: string[];
  fertilize_history: string[];
  water_frequency: string;
  fertilize_frequency: string;
  repot_frequency: string;
  water_next_notif: string;
  fertilize_next_notif: string;
  repot_next_notif: string;
  notes: string[];
  encyclopedia: string;
  NICKLink: string;
}

export const GET_ALL_PLANTS_REQUEST = "GET_ALL_PLANTS_REQUEST";
export const GET_ALL_PLANTS_SUCCESS = "GET_ALL_PLANTS_SUCCESS";
export const GET_ALL_PLANTS_FAIL = "GET_ALL_PLANTS_FAIL";
export const GET_INDIVIDUAL_PLANT_REQUEST = "GET_INDIVIDUAL_PLANT_REQUEST";
export const GET_INDIVIDUAL_PLANT_SUCCESS = "GET_INDIVIDUAL_PLANT_SUCCESS";
export const GET_INDIVIDUAL_PLANT_FAIL = "GET_INDIVIDUAL_PLANT_FAIL";
export const EDIT_PLANT_PIC = "EDIT_PLANT_PIC";
export const EDIT_PLANT_PIC_SUCCESS = "EDIT_PLANT_PIC_SUCCESS";
export const EDIT_PLANT_PIC_FAIL = "EDIT_PLANT_PIC_FAIL";
export const EDIT_PLANTNAME = "EDIT_PLANTNAME";
export const EDIT_PLANTNAME_SUCCESS = "EDIT_PLANTNAME_SUCCESS";
export const EDIT_PLANTNAME_FAIL = "EDIT_PLANTNAME_FAIL";
export const EDIT_NICKNAME = "EDIT_NICKNAME";
export const EDIT_NICKNAME_SUCCESS = "EDIT_NICKNAME_SUCCESS";
export const EDIT_NICKNAME_FAIL = "EDIT_NICKNAME_FAIL";

interface GetAllPlantsSuccessAction {
  type: typeof GET_ALL_PLANTS_SUCCESS;
  payload: any;
}

interface GetIndividualPlantSuccessAction {
  type: typeof GET_INDIVIDUAL_PLANT_SUCCESS;
  payload: any;
}

export type PlantGroupActionTypes =
  | GetAllPlantsSuccessAction
  | GetIndividualPlantSuccessAction;
