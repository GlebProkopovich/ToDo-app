import { IToDo, IToDoListReducerAction } from '../../types';

const initialState: IToDo[] = [];

export const changeToDoListReducer = (
  state = initialState,
  action: IToDoListReducerAction
) => {
  switch (action.type) {
    case 'TODO_ADDED':
      return [...state, action.payload];
    case 'TODOS_CHANGED':
      return action.payload;
    case 'TYPE_CHANGED':
      const { index, newType } = action.payload as {
        index: number;
        newType: string;
      };
      const updatedState = [...state];
      updatedState[index] = { ...updatedState[index], type: newType };
      return updatedState;
    default:
      return state;
  }
};
