import { AsteroidDetails } from 'src/types/AsteroidDetails';
import { Error } from 'src/types/Error';
import { ASTEROID_BACKEND_HOST } from './constants';
import asteroidDetails from '../assets/mock/asteroidDetails.json';

export const useGetAsteroidById = (mock: boolean) => {
  const getAsteroidById = ({ asteroidId }: { asteroidId?: string }) => {
    if (!asteroidId) {
      return Promise.resolve({ message: 'Asteroid ID is missing', code: 400 });
    }
    if (mock) {
      //used to test the Frontend without connecting to the backend
      //@ts-ignore
      return Promise.resolve(asteroidDetails[asteroidId] as AsteroidDetails);
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
