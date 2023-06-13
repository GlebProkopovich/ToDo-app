export interface IToDo {
  text: null | string;
  type: null | string;
}

export interface IToDoListReducerAction {
  type: 'TODO_ADDED' | 'TYPE_CHANGED' | 'TODOS_CHANGED';
  payload?: {
    text: null | string;
    type: null | string;
    index?: number;
    newType?: string;
  };
}

export interface IToDoList {
  toDoListApplication: IToDo[];
}

export interface IToDoProps {
  index: string;
  text: null | string;
  type: null | string;
}
