import {
  GET_MATCHING_ENTRIES,
  GET_MATCHING_ENTRIES_FAIL,
  GET_MATCHING_ENTRIES_SUCCESS,
  SET_UPDATE_SUCCESS,
} from './types';

import {API_ROOT} from '../../src/constants/index';

export const getMatchingEntries = (searchterm: string) => {
  return {
    types: [GET_MATCHING_ENTRIES, GET_MATCHING_ENTRIES_SUCCESS, GET_MATCHING_ENTRIES_FAIL],
    payload: {
      client: 'default',
      request: {
        url: `${API_ROOT}/api/encyclopedia/?limit=500&search=${searchterm}`,
        method: 'GET',
      },
      options: {
        onError({getState, dispatch, error}) {
          try {
            if (error) {
              throw error;
            }
          } catch (e) {
            if (e.response.data.msg != null) {
              console.log('Error: ' + e.response.data.msg);
            }
          }
        },
      },
    },
  };
};
export const setUpdate = (update: boolean) => {
  console.log('Call setupdate: ' + update);
  return {
    type: SET_UPDATE_SUCCESS,
    updatedList: update,
  };
};
