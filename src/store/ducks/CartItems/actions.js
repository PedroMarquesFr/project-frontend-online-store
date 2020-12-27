import { TasksTypes } from './types';

export const addProduct = (prodObject) => ({
  type: TasksTypes.ADD,
  prodObject,
});
export const editProduct = (prodId, boolWillAdd) => ({
  type: TasksTypes.EDIT,
  prodId,
  boolWillAdd,
});
export const removeProduct = (prodId) => ({
  type: TasksTypes.DELETE,
  prodId,
});
