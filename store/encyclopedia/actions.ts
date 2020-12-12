import {
  GET_MATCHING_ENTRIES,
  GET_MATCHING_ENTRIES_FAIL,
  GET_MATCHING_ENTRIES_SUCCESS,
  SET_UPDATE_SUCCESS,
} from './types';

import {API_ROOT, BASIC_TOKEN} from '../../src/constants/index';

export const getMatchingEntries = (searchterm: string) => {
  return {
    types: [GET_MATCHING_ENTRIES, GET_MATCHING_ENTRIES_SUCCESS, GET_MATCHING_ENTRIES_FAIL],
    payload: {
      client: 'default',
      request: {
        url: `${API_ROOT}/api/encyclopedia/?limit=500&search=${searchterm}`,
        headers: {
          "Authorization": "Basic " + BASIC_TOKEN
        },
        method: 'GET',
      },
    },
  };
};
export const setUpdate = (update: boolean) => {
  return {
    type: SET_UPDATE_SUCCESS,
    updatedList: update,
  };
};
