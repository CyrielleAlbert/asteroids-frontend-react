import React from 'react';
import dayjs from 'dayjs';
import { AsteroidDetails } from 'src/types/AsteroidDetails';
import { AsteroidInformation } from 'src/types/AsteroidsList';

export const FutureApproaches = ({ asteroidInformation }: { asteroidInformation: AsteroidDetails }) => {
  const now = dayjs();
  return (
    <div className="border border-solid rounded-lg p-4 h-full">
      <h3 className="w-full text-center text-xl font-medium">Future approaches</h3>
      <div className="flex flex-row overflow-x-auto mt-4 gap-4">
        {asteroidInformation?.close_approach_data
          .filter((approach) => dayjs(approach.close_approach_date) >= now)
          .map((approach, index) => {
            return (
              <div key={index} className="border-solid border rounded-md p-4">
                <h3>{`${approach.orbiting_body} - ${approach.close_approach_date}`}</h3>
                <p>{`Miss distance: ${parseFloat(approach.miss_distance.kilometers).toFixed(2)} km`}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};
