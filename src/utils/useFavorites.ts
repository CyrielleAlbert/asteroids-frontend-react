import React from 'react';
export const useFavoriteAsteroids = () => {
  const [favoriteAsteroids, setFavoriteAsteroids] = React.useState<string[]>([]);
  const [isUpToDate, setIsUpToDate] = React.useState(false);

  const getFavoriteAsteroidsFromSessionStorage = () => {
    const favoriteAsteroids = sessionStorage.getItem('favoriteAsteroids');
    if (favoriteAsteroids) {
      if (!isUpToDate) {
        setIsUpToDate(true);
      }
      return JSON.parse(favoriteAsteroids) as string[];
    }
    return [];
  };
  const addAsteroidToFavorite = (asteroidId: string) => {
    const favoriteAsteroids = getFavoriteAsteroidsFromSessionStorage();
    if (favoriteAsteroids.includes(asteroidId)) {
      return;
    }
    favoriteAsteroids.push(asteroidId);
    sessionStorage.setItem('favoriteAsteroids', JSON.stringify(favoriteAsteroids));
    setIsUpToDate(false);
  };

  const removeAsteroidFromFavorite = (asteroidId: string) => {
    let favoriteAsteroids = getFavoriteAsteroidsFromSessionStorage();
    favoriteAsteroids = favoriteAsteroids.filter((id: string) => id !== asteroidId);
    sessionStorage.setItem('favoriteAsteroids', JSON.stringify(favoriteAsteroids));
    setIsUpToDate(false);
  };

  React.useEffect(() => {
    if (!isUpToDate) {
      setFavoriteAsteroids(getFavoriteAsteroidsFromSessionStorage());
      setIsUpToDate(true);
    }
  }, [isUpToDate]);

  return {
    favoriteAsteroids,
    addAsteroidToFavorite,
    removeAsteroidFromFavorite,
  };
};
