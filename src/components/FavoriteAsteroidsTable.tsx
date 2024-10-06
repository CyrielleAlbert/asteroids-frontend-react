import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import * as Router from 'src/router';
import { Button } from 'antd';
import { useFavoriteAsteroids } from 'src/utils/useFavorites';

export const FavoriteAsteroidsTable = () => {
  const { favoriteAsteroids, removeAsteroidFromFavorite } = useFavoriteAsteroids();
  if (favoriteAsteroids.length === 0) {
    return <p>No favorite asteroids</p>;
  }

  return (
    <table className=" m-12" tabIndex={0} aria-label="Asteroids that have been close to earth and their miss distance">
      <thead className="sticky top-0 bg-white">
        <tr tabIndex={0}>
          <th className="text-left w-4/5 p-3" scope="col">
            Asteroid
          </th>
        </tr>
      </thead>
      <tbody>
        {favoriteAsteroids?.map((favoriteAsteroidId) => (
          <tr key={favoriteAsteroidId} className="min-h-100">
            <td className="flex flex-row items-center justify-between">
              <NavLink to={Router.build.asteroid(favoriteAsteroidId)} className="text-blue-500">
                {`Asteroid ${favoriteAsteroidId}`}
              </NavLink>
              <Button onClick={() => removeAsteroidFromFavorite(favoriteAsteroidId)}>Remove from favorite</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
