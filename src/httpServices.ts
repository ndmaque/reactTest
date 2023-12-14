// api.ts

import { User } from './models.ts';

const baseUrl = 'http://localhost:3600/api/users';

async function fetchData(inputA: string, inputB: string): Promise<User> {
  const url = `${baseUrl}/${inputA}/${inputB}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const userData: User = await response.json();

    return userData;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error;
  }
}

export default fetchData;
