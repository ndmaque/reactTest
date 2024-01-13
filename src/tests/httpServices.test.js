import fetchData from '../httpServices';

test('fetchData function should fetch data correctly', async () => {
  // Assuming you have a mock server using something like `msw` or other mocking libraries
  // Here, you might want to mock the fetch function to simulate a response
  const mockResponse = { id: 'ABC', first_name: 'John', last_name: 'Doe', email: 'john@example.com', phone: '123456789' };
  
  global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockResponse),
    ok: true,
  });

  const result = await fetchData('A');

  // Assertions
  expect(result).toEqual(mockResponse);

  // Make sure fetch was called with the correct URL
  expect(global.fetch).toHaveBeenCalledWith('http://localhost:3600/api/users/A');
});