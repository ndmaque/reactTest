import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

// Mock the httpServices module
jest.mock('./httpServices', () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Import the fetchData function from the mocked module
import fetchData from './httpServices';

// Mock the global fetch function
global.fetch = jest.fn();

beforeEach(() => {
  // Reset the mock implementation before each test
  global.fetch.mockReset();
});

test('fetchData resolves with user data on successful API call', async () => {
  // Mock a successful API response
  const mockUser = {
    id: 'mockId',
    first_name: 'Mock',
    last_name: 'User',
    email: 'mock@example.com',
    phone: '1234567890',
  };
  const mockResponse = { ok: true, json: () => Promise.resolve(mockUser) };
  global.fetch.mockResolvedValue(mockResponse);

  // Call fetchData
  const result = await fetchData('A', 'B');

  // Assertions
  expect(result).toEqual(mockUser);
  expect(global.fetch).toHaveBeenCalledWith('http://localhost:3600/api/users/A/B');
});

test('fetchData rejects with an error on unsuccessful API call', async () => {
  // Mock an unsuccessful API response
  const mockErrorResponse = { ok: false, status: 404, statusText: 'Not Found' };
  global.fetch.mockResolvedValue(mockErrorResponse);

  // Call fetchData and expect it to reject with an error
  await expect(fetchData('C', 'D')).rejects.toEqual(new Error('HTTP error! Status: 404'));
  expect(global.fetch).toHaveBeenCalledWith('http://localhost:3600/api/users/C/D');
});

test('renders send button', () => {
  render(<App />);
  const linkElement = screen.getByText(/Send/i);
  expect(linkElement).toBeInTheDocument();
});



test('handleInputChange updates state correctly', () => {
  // Render the component
  const { getByLabelText } = render(<App />);

  // Simulate input change for inputA
  const inputA = getByLabelText('A:');
  fireEvent.change(inputA, { target: { value: 'new value for A' } });

  // Check if the state for inputA is updated correctly
  expect(inputA.value).toBe('new value for A');

  // Simulate input change for inputB
  const inputB = getByLabelText('B:');
  fireEvent.change(inputB, { target: { value: 'new value for B' } });

  // Check if the state for inputB is updated correctly
  expect(inputB.value).toBe('new value for B');
});