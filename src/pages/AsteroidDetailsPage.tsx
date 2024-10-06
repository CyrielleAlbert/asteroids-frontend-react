import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FutureApproaches } from '../components/FutureApproaches';
import { GeneralInformationBox } from '../components/GeneralInformationBox';
import { HistoricalApproaches } from '../components/HistoricalApproaches';
import { OrbitalInformationBox } from '../components/OrbitalInformationBox';
import { TopNavBar } from '../components/TopNavBar';
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useGetAsteroidById } from 'src/queries/useGetAsteroidById';
import { AsteroidDetails } from 'src/types/AsteroidDetails';

export const AsteroidDetailsPage = () => {
  const asteroidId = useParams<{ id: string }>().id;
  const navigate = useNavigate();
  const [asteroidInformation, setAsteroidInformation] = useState<AsteroidDetails>();
  const [error, setError] = useState<any>(false);
  const [loading, setLoading] = useState<any>(true);
  const { getAsteroidById } = useGetAsteroidById();

  useEffect(() => {
    getAsteroidById({ asteroidId })
      .then((data) => {
        console.log(data);
        if ('message' in data || 'code' in data) {
          setError(true);
          setLoading(false);
        } else {
          setAsteroidInformation(data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
        setError(true);
      });
  }, []);
  return (
    <div className="bg-darkBlue h-screen w-screen">
      <TopNavBar />
      <div className="w-full h-[calc(100%-3.5rem)] flex flex-col items-center justify-center ">
        <div className="bg-white m-14 rounded-lg w-4/5 h-4/5">
          {error ? (
            <div>There was an error fetching the data</div>
          ) : !loading && asteroidInformation ? (
            <>
              <div className="w-full text-center text-4xl text-darkBlue m-auto">{`Asteroid ${asteroidInformation?.name}`}</div>
              <div className="w-full">
                <Button type="primary" className="ml-4" icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>
                  Go back
                </Button>
              </div>
              <div className="grid grid-cols-3 grid-rows-2 gap-4 m-4 h-[calc(100%-104px)]">
                <div className="col-span-1 row-span-1">
                  <GeneralInformationBox asteroidInformation={asteroidInformation} />
                </div>
                <div className="col-span-1 row-span-1">
                  <OrbitalInformationBox asteroidInformation={asteroidInformation} />
                </div>
                <div className="col-span-1 row-span-2">
                  <HistoricalApproaches asteroidInformation={asteroidInformation} />
                </div>
                <div className="col-span-2 row-span-1">
                  <FutureApproaches asteroidInformation={asteroidInformation} />
                </div>
              </div>
            </>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};
