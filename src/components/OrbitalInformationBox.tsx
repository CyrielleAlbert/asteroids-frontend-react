import React from 'react';
import { Attribute } from './Attribute';

export const OrbitalInformationBox = ({ asteroidInformation }: { asteroidInformation: any }) => {
  return (
    <div className="border border-solid rounded-lg p-4 h-full">
      <div className="w-full text-center text-xl">Orbital information</div>
      <div className="flex flex-col gap-4 mt-4">
        <Attribute name="Orbit ID" value={`#${asteroidInformation?.orbital_data.orbit_id}`} />
        <Attribute
          name="Inclination"
          value={`${parseFloat(asteroidInformation?.orbital_data.inclination).toFixed(2)}`}
        />
        <Attribute
          name="Mean motion"
          value={
            asteroidInformation?.orbital_data.mean_motion
              ? `${parseFloat(asteroidInformation?.orbital_data.mean_motion).toFixed(2)}`
              : 'N/A'
          }
        />
        <Attribute name="First observation" value={asteroidInformation?.orbital_data.first_observation_date} />
        <Attribute name="Last observation" value={asteroidInformation?.orbital_data.last_observation_date} />
      </div>
    </div>
  );
};
