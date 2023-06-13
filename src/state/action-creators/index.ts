import { IToDo } from '../../types';

export const addToDoIntoList = (toDo: IToDo) => ({
  type: 'TODO_ADDED',
  payload: toDo,
});

export const changeTypeOfToDo = (index: number, newType: string) => ({
  type: 'TYPE_CHANGED',
  payload: { index, newType },
});

export const changeToDoList = (toDoList: IToDo[]) => ({
  type: 'TODOS_CHANGED',
  payload: toDoList,
});
