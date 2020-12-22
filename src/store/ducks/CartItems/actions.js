import { TasksTypes } from './types';

const addProduct = (prodObject) => {
  return { type: TasksTypes.ADD, prodObject };
};
const editProduct = (prodId,boolAddRm) => {
  return { type: TasksTypes.EDIT, prodId, boolAddRm };
};
const removeProduct = (prodId) => {
  return { type: TasksTypes.DELETE, prodId };
};
