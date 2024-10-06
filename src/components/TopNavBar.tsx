import React from 'react';
import { NavLink } from 'react-router-dom';
import * as Router from 'src/router';

export const TopNavBar = () => {
  return (
    <div className="flex h-14 w-full">
      <div className="w-1/3"></div>
      <NavLink to={Router.path.home} replace={true} className="w-1/3 text-center text-4xl text-white m-auto">
        {'Asteroid'}
      </NavLink>
      <div className="w-1/3"></div>
    </div>
  );
};
