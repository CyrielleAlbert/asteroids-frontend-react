import React from 'react';
import { NavLink } from 'react-router-dom';
import * as Router from 'src/router';
import { useFavoriteAsteroids } from 'src/utils/useFavorites';

export const TopNavBar = () => {
  const { favoriteAsteroids } = useFavoriteAsteroids();
  return (
    <div className="flex h-14 w-full">
      <div className="w-1/3"></div>
      <NavLink to={Router.path.home} replace={true} className="w-1/3 text-center text-4xl text-white m-auto">
        {'Asteroid'}
      </NavLink>
      <div className="w-1/3 text-center text-1xl text-white m-auto">
        <NavLink to={Router.path.favorites} replace={true}>{`${favoriteAsteroids.length} favorite asteroids`}</NavLink>
      </div>
    </div>
  );
};
