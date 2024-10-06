import React, { useEffect } from 'react';
import { TopNavBar } from '../components/TopNavBar';
import dayjs from 'dayjs';
import { AsteroidsTable } from '../components/AsteroidTable';
import { useLocation, useNavigate } from 'react-router-dom';
import { DatePickerBar } from '../components/DatePickerBar';
import queryString from 'query-string';
import _ from 'lodash';
import { useGetAsteroidsListForPeriod } from 'src/queries/useGetAsteroidsListForPeriod';
import { AsteroidInformationForTable } from 'src/types/AsteroidInformationForTable';

export const Home = () => {
  const [dataFetched, setDataFetched] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  const [startDate, setStartDate] = React.useState<string>();
  const [endDate, setEndDate] = React.useState<string>();
  const [asteroids, setAsteroids] = React.useState<AsteroidInformationForTable[] | undefined>();

  const location = useLocation();
  const navigate = useNavigate();

  const searchValues = queryString.parse(location.search);

  const { getAsteroidsListForPeriod } = useGetAsteroidsListForPeriod(true); // set to false if connected to the backend

  const handleStartDateInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value);
  };

  const handleEndDateInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  const handleSearch = () => {
    navigate(`/asteroids?startDate=${startDate}&endDate=${endDate}`);
    setLoading(true);
    getAsteroidsListForPeriod({ startDate, endDate }).then((result) => {
      if ('code' in result || 'message' in result) {
        setError(true);
        setDataFetched(false);
      } else {
        setAsteroids(result);
        setDataFetched(true);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    if (!asteroids && !loading && !error) {
      if (searchValues.startDate && searchValues.endDate) {
        setStartDate(searchValues.startDate as string);
        setEndDate(searchValues.endDate as string);
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
              {error && <p>An error occurred while fetching the data</p>}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
