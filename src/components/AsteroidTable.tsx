import React from 'react';
import { NavLink } from 'react-router-dom';
import * as Router from 'src/router';
import { Lozenge } from './Lozenge';

type Props = {
  asteroids: any[];
};

export const AsteroidsTable = ({ asteroids }: Props) => {
  return (
    <table className="w-full">
      <thead className="sticky top-0 bg-white">
        <tr>
          <th className="text-left w-4/5 p-3">Asteroid</th>
          <th className="text-right w-1/5 p-3">Miss Distance</th>
        </tr>
      </thead>
      <tbody>
        {asteroids?.map((asteroid) => (
          <tr key={asteroid.id} className="min-h-100">
            <td className="text-left flex min-h-100">
              <NavLink to={Router.build.asteroid(asteroid.id)} className="text-blue-500">
                {asteroid.name}
              </NavLink>
              <div className="ml-4">
                <Lozenge
                  type={asteroid.hazardous ? 'error' : 'success'}
                  content={asteroid.hazardous ? 'Hazardous' : 'Non hazardous'}
                />
              </div>
            </td>
            <td className="text-right p-3">
              <div>{`${asteroid.miss_distance} km`}</div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
