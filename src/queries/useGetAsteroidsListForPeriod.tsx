import { Error } from 'src/types/Error';
import { ASTEROID_BACKEND_HOST } from './constants';
import { AsteroidsList } from 'src/types/AsteroidsList';

export const useGetAsteroidsListForPeriod = () => {
  const getAsteroidsListForPeriod = ({ startDate, endDate }: { startDate?: string; endDate?: string }) => {
    if (!startDate || !endDate) {
      return Promise.resolve({ message: 'Start date or end date is missing', code: 400 });
    }
    return fetch(`${ASTEROID_BACKEND_HOST}/fetchAllAsteroidsForPeriod?startDate=${startDate}&endDate=${endDate}`)
      .then((response) => response.json())
      .then((data) => data as AsteroidsList)
      .catch((error) => {
        return { message: `Error fetching the data: ${error.message}`, code: 500 } as Error;
      });
  };

  return {
    getAsteroidsListForPeriod,
  };
};
