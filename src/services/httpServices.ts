// httpServices.ts
import { User } from '../models/models.ts';

async function fetchData(url: string): Promise<User> {
  try {
    const response = await fetch(url);
    const users: User = await response.json();
    return users ;
  } catch (error) {
    console.error('Error fetchData(): ', error.message);
    throw error;
  }
}

export default fetchData;
