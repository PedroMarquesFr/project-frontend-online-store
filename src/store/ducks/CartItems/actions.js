import { TasksTypes } from './types';

const addProduct = (prodObject) => {
  return { type: TasksTypes.ADD, prodObject };
};
const editProduct = (prodId) => {
  return { type: TasksTypes.EDIT, prodId };
};
const failedRequest = (error) => {
  return { type: TasksTypes.FAILED_REQUEST, error };
};
