import { Error } from 'src/types/Error';
import { ASTEROID_BACKEND_HOST } from './constants';
import { AsteroidInformation, AsteroidsList } from 'src/types/AsteroidsList';
import _ from 'lodash';
import { AsteroidInformationForTable } from 'src/types/AsteroidInformationForTable';
import asteroidsListMockData from '../assets/mock/asteroidsList.json';

export const useGetAsteroidsListForPeriod = () => {
  const getAsteroidsListForPeriod = ({ startDate, endDate }: { startDate?: string; endDate?: string }) => {
    if (process.env.NODE_ENV === 'development') {
      //Used to test the Frontend without connecting to the backend
      return Promise.resolve({ ...asteroidsListMockData } as AsteroidsList).then((data: AsteroidsList) => {
        const near_earth_objects = Object.entries(data.near_earth_objects).flatMap(
          ([date, items]: [date: string, items: Array<AsteroidInformation>]) => {
            return items.map(
              (item: AsteroidInformation) =>
                ({
                  name: item.name,
                  id: item.id,
                  hazardous: item.is_potentially_hazardous_asteroid,
                  miss_distance: item.close_approach_data[0].miss_distance.kilometers,
                  date,
                }) as AsteroidInformationForTable,
            );
          },
        );
        const sortedAsteroidsList = _.sortBy(near_earth_objects, 'miss_distance');
        return sortedAsteroidsList;
      });
    }

    if (!startDate || !endDate) {
      return Promise.resolve({ message: 'Start date or end date is missing', code: 400 });
    }
    return fetch(`${ASTEROID_BACKEND_HOST}/fetchAllAsteroidsForPeriod?startDate=${startDate}&endDate=${endDate}`)
      .then((response) => response.json())
      .then((data: AsteroidsList) => {
        const near_earth_objects = Object.entries(data.near_earth_objects).flatMap(
          ([date, items]: [date: string, items: Array<AsteroidInformation>]) => {
            return items.map(
              (item: AsteroidInformation) =>
                ({
                  name: item.name,
                  id: item.id,
                  hazardous: item.is_potentially_hazardous_asteroid,
                  miss_distance: item.close_approach_data[0].miss_distance.kilometers,
                  date,
                }) as AsteroidInformationForTable,
            );
          },
        );
        const sortedAsteroidsList = _.sortBy(near_earth_objects, 'miss_distance');
        return sortedAsteroidsList;
      })
      .catch((error) => {
        return { message: `Error fetching the data: ${error.message}`, code: 500 } as Error;
      });
  };

  return {
    getAsteroidsListForPeriod,
  };
};
