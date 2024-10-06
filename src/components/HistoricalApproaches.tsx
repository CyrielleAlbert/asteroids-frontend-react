import React from 'react';
import dayjs from 'dayjs';

export const HistoricalApproaches = ({ asteroidInformation }: { asteroidInformation: any }) => {
  return (
    <div className="border border-solid rounded-lg p-4 h-full overflow-y-auto">
      <div className="w-full text-center text-xl">Historical approaches</div>
      <div className="flex flex-col mt-4">
        {asteroidInformation?.close_approach_data
          .filter((approach: any) => dayjs(approach.close_approach_date) < dayjs())
          .map((approach: any, index: number) => {
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
