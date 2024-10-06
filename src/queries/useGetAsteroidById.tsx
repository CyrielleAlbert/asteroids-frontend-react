import { AsteroidDetails } from 'src/types/AsteroidDetails';
import { Error } from 'src/types/Error';
import { ASTEROID_BACKEND_HOST } from './constants';

export const useGetAsteroidById = () => {
  const getAsteroidById = ({ asteroidId }: { asteroidId?: string }) => {
    if (!asteroidId) {
      return Promise.resolve({ message: 'Asteroid ID is missing', code: 400 });
    }
    return fetch(`${ASTEROID_BACKEND_HOST}/fetchAsteroidInformationById?asteroidId=${asteroidId}`)
      .then((response) => response.json())
      .then((data) => {
        return data as AsteroidDetails;
      })
      .catch((error) => {
        return { message: `Error fetching the data: ${error.message}`, code: 500 } as Error;
      });
  };

  return {
    getAsteroidById,
  };
};
