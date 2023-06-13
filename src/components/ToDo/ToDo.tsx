import { ChangeEvent, FC } from 'react';
import { IToDoProps } from '../../types';
import { useDispatch } from 'react-redux';
import { changeTypeOfToDo } from '../../state/action-creators';
import './ToDo.scss';

const ToDo: FC<IToDoProps> = ({ index, text, type }) => {
  const dispatch = useDispatch();

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    dispatch(
      changeTypeOfToDo(Number(index), isChecked ? 'completed' : 'active')
    );
  };

  return (
    <div className="ToDo-container">
      <div className="checkbox">
        <input
          type="checkbox"
          id={index}
          className="custom-checkbox"
          checked={type === 'completed' ? true : false}
          onChange={handleCheckboxChange}
        />
        <label htmlFor={index}></label>
      </div>
      <p className={`${type}`}>{text}</p>
    </div>
  );
};

export default ToDo;
