export interface PlantGroupState {
    plants: any []; 
    plant_name: string;
    plant_id: string;
    nickname: string; 
    photo: string;
    water_history: string[];
    repot_history: string[];
    water_frequency: string;
    fertilize_frequency: string;
    repot_frequency: string;
    water_next_notif: string;
    fertilize_next_notif: string;
    repot_next_notif: string;
    notes: string[];
    encyclopedia: string
    userLink: string
}

export const GET_ALL_PLANTS_REQUEST = "GET_ALL_PLANTS_REQUEST";
export const GET_ALL_PLANTS_SUCCESS = "GET_ALL_PLANTS_SUCCESS";
export const GET_ALL_PLANTS_FAIL = "GET_ALL_PLANTS_FAIL";

interface GetAllPlantsSuccessAction {
    type: typeof GET_ALL_PLANTS_SUCCESS;
    payload: any;
  }

  export type PlantGroupActionTypes =
  | GetAllPlantsSuccessAction;