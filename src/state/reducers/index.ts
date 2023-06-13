import { combineReducers } from 'redux';
import { changeToDoListReducer } from './changeToDoListReducer';

export const reducers = combineReducers({
  toDoListApplication: changeToDoListReducer,
});
