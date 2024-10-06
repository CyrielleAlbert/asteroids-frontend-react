import React from 'react';
import { Attribute } from './Attribute';
import { AsteroidInformation } from 'src/types/AsteroidsList';
import { AsteroidDetails } from 'src/types/AsteroidDetails';

export const GeneralInformationBox = ({ asteroidInformation }: { asteroidInformation: AsteroidDetails }) => {
  return (
    <div className="border border-solid rounded-lg p-4 h-full m-h-full overflow-y-auto">
      <h3 className="w-full text-center text-xl font-medium">General information</h3>
      <div className="flex flex-col gap-4 mt-4">
        <Attribute name="Name" value={asteroidInformation?.name} />
        <Attribute name="Designation" value={asteroidInformation?.designation} />
        <Attribute
          name="Is potentially hazardous"
          value={asteroidInformation?.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}
        />
        <Attribute name="Absolute magnitude H" value={asteroidInformation?.absolute_magnitude_h} />
        <Attribute
          name="Estimated diameter"
          value={`${asteroidInformation?.estimated_diameter.kilometers.estimated_diameter_min}-${asteroidInformation?.estimated_diameter.kilometers.estimated_diameter_max} km`}
        />
      </div>
    </div>
  );
};
