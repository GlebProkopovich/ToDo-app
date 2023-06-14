import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import store from './state/store';

describe('App component', () => {
  it('renders App component correctly', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const appElement = screen.getByText('todos');
    expect(appElement).toBeInTheDocument();
  });

  it('adds a new task when Enter key is pressed', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const inputElement = screen.getByPlaceholderText('What needs to be done?');

    fireEvent.change(inputElement, { target: { value: 'New task' } });
    fireEvent.keyPress(inputElement, { key: 'Enter', code: 13, charCode: 13 });

    const addedTask = screen.getByText('New task');
    expect(addedTask).toBeInTheDocument();
  });

  it('change the active button to active state when clicked', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const activeButton = screen.getByText('Active');
    fireEvent.click(activeButton);
    expect(activeButton).toHaveClass('active');
  });

  it('change the completed button to active state when clicked', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const completedButton = screen.getByText('Completed');
    fireEvent.click(completedButton);
    expect(completedButton).toHaveClass('active');
  });

  it('change the all button to active state when clicked', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const allButton = screen.getByText('All');
    fireEvent.click(allButton);
    expect(allButton).toHaveClass('active');
  });
});
