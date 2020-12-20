import { REQUESTING_DATA, RECEIVED_DATA, FAILED_REQUEST } from './types';
const initialState = {
  isFetching: false,
  charObj: false,
  error: '',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case REQUESTING_DATA:
      return { ...state, isFetching: true };
    case RECEIVED_DATA:
      return { ...state, charObj: action.resp[0], isFetching: false };
    case FAILED_REQUEST:
      return { ...state, error: action.resp, isFetching: false };
    default:
      return state;
  }
}
