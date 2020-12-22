//reducer
import { TasksTypes } from './types';

const initialState = {
  cart: [
    {
      id: 'MLB1365396415',
      title: 'Prancha De Cabelo Lizze Extreme Cinza 110v',
      price: 465,
      available_quantity: 5,
    },
    {
      id: 'MLB1365396416',
      title: 'Prancha De Cabelo Lizze Extreme Cinza 110v',
      price: 465,
      available_quantity: 5,
    },
  ],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TasksTypes.ADD:
      return { ...state, cart: [...state.cart, action.prodObject] };
    case TasksTypes.EDIT:
      return { ...state, cart: [...state.cart] };
    case TasksTypes.DELETE:
      let newArray = state.cart;
      state.cart.find(({ id }, index) => {
        if (id === action.prodId) {
          newArray.splice(index, 1);
          return true;
        }
        return false;
      });
      return { ...state, cart: [...newArray] };
    default:
      return state;
  }
}
