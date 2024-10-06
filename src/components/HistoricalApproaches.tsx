import React from 'react';
import dayjs from 'dayjs';
import { AsteroidDetails } from 'src/types/AsteroidDetails';

export const HistoricalApproaches = ({ asteroidInformation }: { asteroidInformation: AsteroidDetails }) => {
  const now = dayjs();
  return (
    <div className="border border-solid rounded-lg p-4 h-full overflow-y-auto">
      <h3 className="w-full text-center text-xl font-medium">Historical approaches</h3>
      <div className="flex flex-col mt-4">
        {asteroidInformation?.close_approach_data
          .filter((approach) => dayjs(approach.close_approach_date) < now)
          .map((approach, index) => {
            return (
              <div key={index} className="h-100 border-solid border rounded-md p-4 mb-2">
                <h3>{`${approach.orbiting_body} - ${approach.close_approach_date}`}</h3>
                <p>{`Miss distance: ${parseFloat(approach.miss_distance.kilometers).toFixed(2)} km`}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};
