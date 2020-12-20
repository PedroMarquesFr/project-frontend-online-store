import {getProductsFromCategoryAndQuery} from '../../../services/api';
import { TasksTypes } from './types';

const requestingData = () => {
  return { type: TasksTypes.REQUESTING_DATA };
};
const receivedData = (result) => {
  return { type: TasksTypes.RECEIVED_DATA, resp:result };
};
const failedRequest = (error) => {
  return { type: TasksTypes.FAILED_REQUEST, resp: error };
};
export default function handleAsync(categoryId, query) {
  return async (dispatch) => {
    try {
      dispatch(requestingData());
      console.log('antes');
      const resp = await getProductsFromCategoryAndQuery(categoryId, query);
      console.log('depois');
      return dispatch(receivedData(resp.results));
    } catch (error) {
      return dispatch(failedRequest(error));
    }
  };
}
