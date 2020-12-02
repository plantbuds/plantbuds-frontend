import {
    GET_ALL_PLANTS_REQUEST,
    GET_ALL_PLANTS_SUCCESS,
    GET_ALL_PLANTS_FAIL,
} from "./types";

import { API_ROOT } from "../../src/constants/index";
export const getAllPlants = (username: string) => {
    return {
        types: [GET_ALL_PLANTS_REQUEST, GET_ALL_PLANTS_SUCCESS, GET_ALL_PLANTS_FAIL],
        payload: {
          client: "default",
          request: {
            url: `${API_ROOT}/api/plantprofile/?username=${username}`,
            method: "GET",
          },
        }
      };
}