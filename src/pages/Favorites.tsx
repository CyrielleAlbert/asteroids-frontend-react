import React from 'react';
import { FavoriteAsteroidsTable } from 'src/components/FavoriteAsteroidsTable';
import { TopNavBar } from 'src/components/TopNavBar';
import { useFavoriteAsteroids } from 'src/utils/useFavorites';

export const Favorites = () => {
  return (
    <div className="bg-darkBlue h-screen w-screen">
      <TopNavBar />
      <div className="w-full h-[calc(100%-3.5rem)] flex flex-col items-center justify-center ">
        <div className="bg-white m-14 rounded-lg w-4/5 h-4/5 p-14">
          <FavoriteAsteroidsTable />
        </div>
      </div>
    </div>
  );
};
