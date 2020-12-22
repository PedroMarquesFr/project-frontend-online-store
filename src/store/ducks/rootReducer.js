import { combineReducers } from "redux";

import APIRequest from './APIRequest';
import CartItems from './CartItems';


export default combineReducers({
    APIRequest, CartItems
});