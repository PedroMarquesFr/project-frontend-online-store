import {getProductsFromCategoryAndQuery} from '../../../services/api';
import { REQUESTING_DATA, RECEIVED_DATA, FAILED_REQUEST } from './types';

const requestingData = () => {
  return { type: REQUESTING_DATA };
};
const receivedData = (character) => {
  return { type: RECEIVED_DATA, resp: character };
};
const failedRequest = (error) => {
  return { type: FAILED_REQUEST, resp: error };
};
export default function handleAsync(categoryId, query) {
  return async (dispatch) => {
    try {
      dispatch(requestingData());
      console.log('antes');
      const resp = await getProductsFromCategoryAndQuery(categoryId, query);
      console.log('depois');
      return dispatch(receivedData(resp));
    } catch (error) {
      return dispatch(failedRequest(error));
    }
  };
}
