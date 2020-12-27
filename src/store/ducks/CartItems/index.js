//reducer
import { TasksTypes } from './types';

const initialState = {
  cart: [],
};

function isBiggerThem(state, index) {
  const added = state.cart[index].quantity;
  const maxQuantity = state.cart[index].availableQuantity;
  if (added > maxQuantity) {
    state.cart[index].quantity = maxQuantity;
  }
}
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TasksTypes.ADD:
      const index = state.cart.findIndex(({ id }) => id === action.prodObject.id);
      if (index > -1) {
        state.cart[index].quantity += 1;
        isBiggerThem(state, index);
        return { ...state };
      }
      return { ...state, cart: [...state.cart, action.prodObject] };
    case TasksTypes.EDIT:
      state.cart.find(({ id, quantity }, index) => {
        if (id === action.prodId) {
          state.cart[index].quantity = action.boolWillAdd
            ? (quantity += 1)
            : (quantity -= 1); //mudo jaja
          return true;
        }
        return false;
      });
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
