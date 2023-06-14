import { render } from '@testing-library/react';
import ToDo from './ToDo';
import { Provider } from 'react-redux';
import store from '../../state/store';

describe('ToDo component', () => {
  const mockProps = {
    index: '0',
    text: 'Test todo',
    type: 'active',
  };

  it('renders todo text correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <ToDo {...mockProps} />
      </Provider>
    );

    const toDoText = getByText('Test todo');
    expect(toDoText).toBeInTheDocument();
  });

  it('renders checkbox with correct checked state', () => {
    const { container } = render(
      <Provider store={store}>
        <ToDo {...mockProps} />
      </Provider>
    );
    const checkbox = container.querySelector(
      '.custom-checkbox'
    ) as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
  });

  it('applies the "completed" class to the todo text when type is "completed"', () => {
    const completedProps = {
      ...mockProps,
      type: 'completed',
    };

    const { container } = render(
      <Provider store={store}>
        <ToDo {...completedProps} />
      </Provider>
    );

    const todoText = container.querySelector('.completed');

    expect(todoText).toBeInTheDocument();
  });
});
