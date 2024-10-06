import React from 'react';
import { NavLink } from 'react-router-dom';
import * as Router from 'src/router';
import { Lozenge } from './Lozenge';
import { AsteroidInformationForTable } from 'src/types/AsteroidInformationForTable';

type Props = {
  asteroids: AsteroidInformationForTable[];
};

export const AsteroidsTable = ({ asteroids }: Props) => {
  return (
    <table className="w-full" tabIndex={0} aria-label="Asteroids that have been close to earth and their miss distance">
      <thead className="sticky top-0 bg-white">
        <tr tabIndex={0}>
          <th className="text-left w-4/5 p-3" scope="col">
            Asteroid
          </th>
          <th className="text-right w-1/5 p-3" scope="col">
            Miss Distance
          </th>
        </tr>
      </thead>
      <tbody>
        {asteroids?.map((asteroid) => (
          <tr key={asteroid.id} className="min-h-100">
            <td className="text-left md:flex items-center p-2">
              <NavLink to={Router.build.asteroid(asteroid.id)} className="text-blue-500">
                {`Asteroid ${asteroid.name}`}
              </NavLink>
              <div className="md:ml-4">
                <Lozenge
                  type={asteroid.hazardous ? 'error' : 'success'}
                  content={asteroid.hazardous ? 'Hazardous' : 'Non hazardous'}
                />
              </div>
            </td>
            <td className="text-right p-2">
              <p>{`${Number(asteroid.miss_distance).toFixed(0)} km`}</p>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
