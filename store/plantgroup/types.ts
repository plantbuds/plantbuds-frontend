export interface PlantGroupState {
  editedPlant: boolean;
  createdPlant: boolean;
  plants: any[];
  plant_name: string;
  plant_id: number;
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
  user: string;
}

export const GET_ALL_PLANTS_REQUEST = "GET_ALL_PLANTS_REQUEST";
export const EDIT_PLANT = "EDIT_PLANT";
export const GET_ALL_PLANTS_SUCCESS = "GET_ALL_PLANTS_SUCCESS";
export const GET_ALL_PLANTS_FAIL = "GET_ALL_PLANTS_FAIL";
export const GET_INDIVIDUAL_PLANT_REQUEST = "GET_INDIVIDUAL_PLANT_REQUEST";
export const GET_INDIVIDUAL_PLANT_SUCCESS = "GET_INDIVIDUAL_PLANT_SUCCESS";
export const GET_INDIVIDUAL_PLANT_FAIL = "GET_INDIVIDUAL_PLANT_FAIL";
export const CREATE_PLANT = "CREATE_PLANT";
export const CREATE_PLANT_SUCCESS = "CREATE_PLANT_SUCCESS";
export const CREATE_PLANT_FAIL = "CREATE_PLANT_FAIL";
export const EDIT_PLANT_PIC = "EDIT_PLANT_PIC";
export const EDIT_PLANT_PIC_SUCCESS = "EDIT_PLANT_PIC_SUCCESS";
export const EDIT_PLANT_PIC_FAIL = "EDIT_PLANT_PIC_FAIL";
export const EDIT_PLANTNAME = "EDIT_PLANTNAME";
export const EDIT_PLANTNAME_SUCCESS = "EDIT_PLANTNAME_SUCCESS";
export const EDIT_PLANTNAME_FAIL = "EDIT_PLANTNAME_FAIL";
export const EDIT_NICKNAME = "EDIT_NICKNAME";
export const EDIT_NICKNAME_SUCCESS = "EDIT_NICKNAME_SUCCESS";
export const EDIT_NICKNAME_FAIL = "EDIT_NICKNAME_FAIL";
export const SET_EDITED_PLANT = "SET_EDIT_PLANT";
export const SET_CREATED_PLANT = "SET_CREATED_PLANT";

interface GetAllPlantsSuccessAction {
  type: typeof GET_ALL_PLANTS_SUCCESS;
  payload: any;
}

interface GetIndividualPlantSuccessAction {
  type: typeof GET_INDIVIDUAL_PLANT_SUCCESS;
  payload: any;
}

interface GetAllPlantsRequestAction {
  type: typeof GET_ALL_PLANTS_REQUEST;
  payload: any;
}

interface EditPlantPicSuccessAction {
  type: typeof EDIT_PLANT_PIC_SUCCESS;
  imageURI: string;
}

interface EditPlantNameSuccessAction {
  type: typeof EDIT_PLANTNAME_SUCCESS;
  plant_name: string;
}

interface EditPlantNicknameSucessAction {
  type: typeof EDIT_NICKNAME_SUCCESS;
  nickname: string;
}

interface SetEditedPlantAction {
    type: typeof SET_EDITED_PLANT;
    editedPlant: boolean;
}

interface SetCreatedPlantAction {
    type: typeof SET_CREATED_PLANT;
    createdPlant: boolean;
}

export type PlantGroupActionTypes =
| SetCreatedPlantAction
  | GetAllPlantsRequestAction
  | GetAllPlantsSuccessAction
  | GetIndividualPlantSuccessAction
  | EditPlantPicSuccessAction
  | EditPlantNameSuccessAction
  | SetEditedPlantAction
  | EditPlantNicknameSucessAction;
