import React from 'react';
import dayjs from 'dayjs';

export const FutureApproaches = ({ asteroidInformation }: { asteroidInformation: any }) => {
  const now = dayjs();
  return (
    <div className="border border-solid rounded-lg p-4 gap-4 h-full">
      <div className="w-full text-center text-xl">Future approaches</div>
      <div className="flex flex-row overflow-x-auto mt-4">
        {asteroidInformation?.close_approach_data
          .filter((approach: any) => dayjs(approach.close_approach_date) >= now)
          .map((approach: any, index: number) => {
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
