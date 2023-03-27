import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import {
  MainCard, MainChart, MainFooter, MainHeader, Spinner, TableCountry, TableProv
} from './components';
import {
  useAllDataCountries, useChartCountry, useChartGlobal, useDataCountry, useDataProv, useDetailCountry, useWorldCases
} from './hooks/useChart';

function App() {
  const [iso, setIso] = useState('');
  const { fetchWorldCases, worldCases } = useWorldCases();
  const { fetchChartGlobal, chartGlobal } = useChartGlobal();
  const { fetchChartCountry, chartCountry } = useChartCountry(iso);
  const { fetchDetailCountry, detailCountry } = useDetailCountry(iso);
  const { fetchDataCountry, dataCountry } = useDataCountry();
  const { fetchAllDataCountries, allDataCountries } = useAllDataCountries();
  const { fetchDataProv, dataProv } = useDataProv();

  const handleSearchCountries = (val: any) => {
    console.log(val);
  };

  const handleSearchProvincies = (val: any) => {
    console.log(val);
  };

  useEffect(() => {
    fetchWorldCases();
    fetchChartGlobal();
    fetchAllDataCountries();
    fetchChartCountry();
    fetchDetailCountry();
  }, []);


  return (
    <div className="App">
      <MainHeader
        isLoading={worldCases.isLoading}
        totalCase={worldCases.totalCase}
        recovered={worldCases.totalRecovered}
        death={worldCases.totalDeaths}
        lastUpdate={worldCases.lastUpdate}
      />
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-8 col-md-12 mb-4">
            <MainChart
              cases={chartGlobal.cases}
              recovered={chartGlobal.recovered}
              deaths={chartGlobal.deaths}
              keyChart={chartGlobal.keyChart}
              isLoading={chartGlobal.isLoading}
              title="Data Global"
            />
          </div>
          <div className="col-lg-4 col-md-12 mb-4">
            <p className="text-semi">
              Terakhir diperbarui:
              {' '}
              <span className="text-danger font-weight-bold">
                {chartGlobal.isLoading ? (
                  '....'
                ) : (
                  <span>
                    {dayjs(worldCases.lastUpdate).format('DD MMM YYYY hh:mm')}
                  </span>
                )}
              </span>
            </p>
            <div className="row">
              <div className="col-md-12 mb-3">
                <MainCard
                  isTotal
                  title="Statistik Total - Dunia"
                  isLoading={worldCases.isLoading}
                  cases={worldCases.totalCase}
                  recovered={worldCases.totalRecovered}
                  deaths={worldCases.totalDeaths}
                />
              </div>
              <div className="col-md-12">
                <MainCard
                  title="Statistik Hari Ini - Dunia"
                  isLoading={worldCases.isLoading}
                  cases={worldCases.todayCase}
                  recovered={worldCases.todayRecovered}
                  deaths={worldCases.todayDeaths}
                />
              </div>
            </div>
          </div>
          <div className="col-md-12 mt-3 mb-4 border-top pt-4">
            <h4 className="text-semi"> Statistik Berdasarkan Negara </h4>
          </div>
          <div className="col-lg-8 col-md-12 mb-4">
            {dataCountry.isLoading ? (
              'Loading...'
            ) : (
              <div className="mb-3">
                <span>search</span>
              </div>
            )}
            <MainChart
              cases={chartCountry.cases}
              recovered={chartCountry.recovered}
              deaths={chartCountry.deaths}
              keyChart={chartCountry.keyChart}
              isLoading={chartCountry.isLoading}
              title={chartCountry.country}
            />
          </div>
          <div className="col-lg-4 col-md-12 mb-4">
            <div className="row">
              <div className="col-md-12 mb-3">
                <p className="text-semi">
                  Terakhir diperbarui:
                  {' '}
                  <span className="text-danger font-weight-bold">
                    {detailCountry.isLoading ? (
                      '....'
                    ) : (
                      <span>{dayjs(detailCountry.lastUpdate).format('DD MMM YYYY hh:mm')}</span>
                    )}
                  </span>
                </p>
                <MainCard
                  isTotal
                  title={`Statistik Total - ${detailCountry.countryName}`}
                  isLoading={detailCountry.isLoading}
                  cases={detailCountry.totalCases}
                  recovered={detailCountry.totalRecovered}
                  deaths={detailCountry.totalDeaths}
                />
              </div>
              <div className="col-md-12">
                <MainCard
                  title={`Statistik Hari Ini - ${detailCountry.countryName}`}
                  isLoading={detailCountry.isLoading}
                  cases={detailCountry.todayCases}
                  recovered={detailCountry.todayRecovered}
                  deaths={detailCountry.todayDeaths}
                />
              </div>
            </div>
          </div>
          <div className="col-md-12 mt-5 shadow-sm py-3">
            <h5 className="text-semi mb-3">List negara terdampak covid-19</h5>
            <div className="form-group">
              <input
                type="text"
                placeholder="Cari berdasarkan nama negara..."
                className="form-control"
                onChange={(e) => handleSearchCountries(e)}
              />
            </div>
            {allDataCountries.isLoading ? (
              <div className="py-5">
                <Spinner />
              </div>
            ) : (
              <TableCountry
                countries={allDataCountries.dataCountries}
                isLoading={allDataCountries.isLoading}
              />
            )}
          </div>
        </div>
      </div>
      <MainFooter />
    </div>
  );
}

export default App;
