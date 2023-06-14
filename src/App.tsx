import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToDoIntoList, changeToDoList } from './state/action-creators';
import { IToDo, IToDoList } from './types';
import ToDo from './components/ToDo/ToDo';
import './App.scss';

const App: FC = () => {
  const [toDoListCompletedTasks, setToDoListCompletedTasks] = useState<IToDo[]>(
    []
  );
  const [toDoListActiveTasks, setToDoListActiveTasks] = useState<IToDo[]>([]);
  const [toDoTaskValue, setToDoTaskValue] = useState<string>('');
  const [isAllButtonActive, setAllButtonActive] = useState<boolean>(true);
  const [isActiveButtonActive, setActiveButtonActive] =
    useState<boolean>(false);
  const [isCompletedButtonActive, setCompletedButtonActive] =
    useState<boolean>(false);

  const toDoTaskValueRef = useRef<HTMLInputElement>(null);

  const toDoList = useSelector((state: IToDoList) => state.toDoListApplication);

  const dispatch = useDispatch();

  const handleClickOnAllButton = (): void => {
    setAllButtonActive(true);
    setActiveButtonActive(false);
    setCompletedButtonActive(false);
  };

  const handleClickOnActiveButton = (): void => {
    setAllButtonActive(false);
    setActiveButtonActive(true);
    setCompletedButtonActive(false);
  };

  const handleClickOnCompletedButton = (): void => {
    setAllButtonActive(false);
    setActiveButtonActive(false);
    setCompletedButtonActive(true);
  };

  const handleClickOnClearCompleted = (): void => {
    const filteredToDos = toDoList?.filter((el) => el.type !== 'completed');
    dispatch(changeToDoList(filteredToDos));
  };

  const handleToDoTaskValue = (e: ChangeEvent<HTMLInputElement>): void => {
    setToDoTaskValue(e.target.value);
  };

  // const handleKeyPressEnter = (): void => {
  //   dispatch(addToDoIntoList({ text: toDoTaskValue, type: 'active' }));
  //   setToDoTaskValue('');
  // };

  const handleKeyPressEnter = useCallback(() => {
    dispatch(addToDoIntoList({ text: toDoTaskValue, type: 'active' }));
    setToDoTaskValue('');
  }, [dispatch, toDoTaskValue]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleKeyPressEnter();
      }
    };

    const inputElement = toDoTaskValueRef.current;
    inputElement && inputElement.addEventListener('keypress', handleKeyPress);

    return () => {
      inputElement &&
        inputElement.removeEventListener('keypress', handleKeyPress);
    };
  }, [toDoTaskValue, handleKeyPressEnter]);

  useEffect(() => {
    const filteredActiveToDos = toDoList.filter((el) => el.type === 'active');
    setToDoListActiveTasks(filteredActiveToDos);
    const filteredCompletedToDos = toDoList.filter(
      (el) => el.type === 'completed'
    );
    setToDoListCompletedTasks(filteredCompletedToDos);
  }, [toDoList]);

  console.log(toDoList);

  return (
    <div className="App">
      <h1>todos</h1>
      <div className="ToDos-container">
        <div className="ToDo-task">
          <button className="dropdownToDosBtn">
            <span className="material-symbols-outlined">expand_more</span>
          </button>
          <input
            type="text"
            placeholder="What needs to be done?"
            value={toDoTaskValue}
            onChange={handleToDoTaskValue}
            ref={toDoTaskValueRef}
          />
        </div>
        {isAllButtonActive &&
          toDoList.map((el, index) => {
            return (
              <ToDo
                key={el.text}
                text={el.text}
                index={String(index)}
                type={el.type}
              />
            );
          })}
        {isActiveButtonActive &&
          toDoListActiveTasks.map((el, index) => {
            return (
              <ToDo
                key={el.text}
                text={el.text}
                index={String(index)}
                type={el.type}
              />
            );
          })}
        {isCompletedButtonActive &&
          toDoListCompletedTasks.map((el, index) => {
            return (
              <ToDo
                key={el.text}
                text={el.text}
                index={String(index)}
                type={el.type}
              />
            );
          })}
        {toDoList.length > 0 && (
          <div className="ToDos-buttons">
            <p>{`${toDoListActiveTasks.length} ${
              toDoListActiveTasks.length === 1 ? 'item left' : 'items left'
            }`}</p>
            <div className="buttons">
              <button
                className={`ToDos-button ${isAllButtonActive && 'active'}`}
                onClick={handleClickOnAllButton}
              >
                All
              </button>
              <button
                className={`ToDos-button ${isActiveButtonActive && 'active'}`}
                onClick={handleClickOnActiveButton}
              >
                Active
              </button>
              <button
                className={`ToDos-button ${
                  isCompletedButtonActive && 'active'
                }`}
                onClick={handleClickOnCompletedButton}
              >
                Completed
              </button>
            </div>
            <button
              className="ToDos-button"
              onClick={handleClickOnClearCompleted}
            >
              Clear completed
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
