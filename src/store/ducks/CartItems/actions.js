import { TasksTypes } from './types';

export const addProduct = (prodObject) => {
  return { type: TasksTypes.ADD, prodObject };
};
export const editProduct = (prodId,boolWillAdd) => {
  return { type: TasksTypes.EDIT, prodId, boolWillAdd };
};
export const removeProduct = (prodId) => {
  return { type: TasksTypes.DELETE, prodId };
};
