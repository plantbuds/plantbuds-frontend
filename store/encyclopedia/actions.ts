import {
    GET_MATCHING_ENTRIES, 
    GET_MATCHING_ENTRIES_SUCCESS,
    GET_MATCHING_ENTRIES_FAIL,
}
from "./types";

import { API_ROOT } from "../../src/constants/index";
export const getMatchingEntries = (searchterm: string) => {
    return {
        types: [GET_MATCHING_ENTRIES, GET_MATCHING_ENTRIES_SUCCESS, GET_MATCHING_ENTRIES_FAIL],
        payload: {
          client: "default",
          request: {
            url: `${API_ROOT}/api/encyclopedia/?search=${searchterm}`,
            method: "GET",
          }
        }
    };
}