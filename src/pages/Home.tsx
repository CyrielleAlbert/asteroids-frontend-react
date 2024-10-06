import React, { useEffect } from 'react';
import { TopNavBar } from '../components/TopNavBar';
import dayjs from 'dayjs';
import { AsteroidsTable } from '../components/AsteroidTable';
import { useLocation, useNavigate } from 'react-router-dom';
import { DatePickerBar } from '../components/DatePickerBar';
import queryString from 'query-string';
import _ from 'lodash';
import { useGetAsteroidsListForPeriod } from 'src/queries/useGetAsteroidsListForPeriod';

export const Home = () => {
  const [dataFetched, setDataFetched] = React.useState(false);
  const [startDate, setStartDate] = React.useState<string>();
  const [endDate, setEndDate] = React.useState<string>();
  const [asteroids, setAsteroids] = React.useState<any[]>();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const location = useLocation();
  const searchValues = queryString.parse(location.search);
  const navigate = useNavigate();

  const { getAsteroidsListForPeriod } = useGetAsteroidsListForPeriod();

  const handleStartDateInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value);
  };

  const handleEndDateInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  const handleSearch = () => {
    navigate(`/asteroids?startDate=${startDate}&endDate=${endDate}`);
    setLoading(true);
    const asteroidsListForPeriod = getAsteroidsListForPeriod({ startDate, endDate });
    asteroidsListForPeriod
      .then((data) => {
        const isDataError = 'message' in data || 'code' in data;
        if (!isDataError) {
          const near_earth_objects = Object.entries(data.near_earth_objects).flatMap(
            ([date, items]: [date: any, items: any]) => {
              return items.map((item: any) => ({
                name: item.name,
                id: item.id,
                hazardous: item.is_potentially_hazardous_asteroid,
                miss_distance: item.close_approach_data[0].miss_distance.kilometers,
                date,
              }));
            },
          );
          const sortedAsteroidsList = _.sortBy(near_earth_objects, 'miss_distance');

          setAsteroids(sortedAsteroidsList);
          setDataFetched(true);
          setLoading(false);
        } else {
          console.log('Error fetching the data', error);
          setLoading(false);
          setError(true);
        }
      })
      .catch((error) => {
        console.log('Error fetching the data', error);
        setLoading(false);
        setError(true);
      });
  };

  useEffect(() => {
    if (!asteroids && !loading && !error) {
      if (searchValues.startDate && searchValues.endDate) {
        setStartDate(searchValues.startDate as string);
        setEndDate(searchValues.endDate as string);
        handleSearch();
      }
    }
  }, []);

  return (
    <div className="bg-darkBlue h-screen w-screen">
      <TopNavBar />
      <div className="w-full h-[calc(100%-3.5rem)] flex flex-col items-center justify-center">
        {dataFetched && asteroids ? (
          <div className="bg-white mt-4 rounded-lg p-8">
            <h1 className="m-4 text-darkBlue sm:text-xl md:text-4xl">{'Find asteroids that passed Earth'}</h1>

            <div className="m-4">
              <DatePickerBar
                startDate={startDate}
                setStartDate={handleStartDateInputChange}
                endDate={endDate}
                setEndDate={handleEndDateInputChange}
                handleSearch={handleSearch}
                disabled={loading}
              />
            </div>
            <h2 className="m-4 text-darkBlue sm:text-base md:text-xl	">{`Asteroids that passed the earth between the ${dayjs(
              startDate,
            ).format('DD.MM.YYYY')} and the ${dayjs(endDate).format('DD.MM.YYYY')}`}</h2>
            <div className="p-4 w-full h-[450px] overflow-y-auto pt-0">
              <AsteroidsTable asteroids={asteroids} />
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-white sm:text-xl md:text-4xl lg:text-6xl">{'Find asteroids that passed Earth'}</h1>
            <div className="bg-white mt-4 rounded-lg p-8">
              <DatePickerBar
                startDate={startDate}
                setStartDate={handleStartDateInputChange}
                endDate={endDate}
                setEndDate={handleEndDateInputChange}
                handleSearch={handleSearch}
                disabled={loading}
              />
              {loading && <p>Loading...</p>}
              {!!error && <p>There was an error fetching the data</p>}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
