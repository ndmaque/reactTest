// httpServices.ts

import { User } from './models.ts';

const baseUrl = 'http://localhost:3600/api/users';


async function fetchData(userID: string): Promise<User> {
  const url = `${baseUrl}/${userID}`;

  try {
    const response = await fetch(url);
    const users: User = await response.json();

    return users ;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error;
  }
}

export default fetchData;
