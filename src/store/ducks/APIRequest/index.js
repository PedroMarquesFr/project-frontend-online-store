import { TasksTypes } from './types';
const initialState = {
  isFetching: false,
  products: [],
  error: '',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TasksTypes.REQUESTING_DATA:
      return { ...state, isFetching: true };
    case TasksTypes.RECEIVED_DATA:
      return { ...state, products: action.resp, isFetching: false };
    case TasksTypes.FAILED_REQUEST:
      return { ...state, error: action.resp, isFetching: false };
    default:
      return state;
  }
}
