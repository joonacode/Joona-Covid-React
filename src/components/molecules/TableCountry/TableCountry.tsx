import { NumericFormat } from 'react-number-format';
import { Spinner } from '@/components/atoms';

type Props = {
  countries: any[]
  isLoading: boolean
}

function TableCountry({ countries, isLoading }: Props) {
  return (
    <div
      className="table-responsive"
      style={{ maxHeight: '400px', overflow: 'auto' }}
    >
      <table className="table">
        <thead>
          <tr>
            <th className="sticky-top bg-white" scope="col">
              #
            </th>
            <th className="sticky-top bg-white" scope="col">
              Negara
            </th>
            <th className="sticky-top bg-white" scope="col">
              Total Kasus
            </th>
            <th className="sticky-top bg-white" scope="col">
              Kasus Hari Ini
            </th>
            <th className="sticky-top bg-white" scope="col">
              Total Meninggal
            </th>
            <th className="sticky-top bg-white" scope="col">
              Meninggal Hari Ini
            </th>
            <th className="sticky-top bg-white" scope="col">
              Total Pulih
            </th>
            <th className="sticky-top bg-white" scope="col">
              Pulih Hari Ini
            </th>
            <th className="sticky-top bg-white" scope="col">
              Kasus Aktif
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <Spinner />
          ) : (
            countries.length > 0
            && countries.map((country, i) => (
              <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{country.country}</td>
                <td>
                  <NumericFormat
                    value={country.cases}
                    displayType="text"
                    thousandSeparator
                  />
                </td>
                <td>
                  <NumericFormat
                    value={country.todayCases}
                    displayType="text"
                    thousandSeparator
                  />
                </td>
                <td>
                  {' '}
                  <NumericFormat
                    value={country.deaths}
                    displayType="text"
                    thousandSeparator
                  />
                </td>
                <td
                  className={`${country.todayDeaths > 0 ? 'bg-danger text-white' : ''}`}
                >
                  <NumericFormat
                    value={country.todayDeaths}
                    displayType="text"
                    thousandSeparator
                  />
                </td>
                <td>
                  <NumericFormat
                    value={country.recovered}
                    displayType="text"
                    thousandSeparator
                  />
                </td>
                <td
                  className={`${country.todayRecovered > 0
                    ? 'bg-success text-white' : ''}`}
                >
                  <NumericFormat
                    value={country.todayRecovered}
                    displayType="text"
                    thousandSeparator
                  />
                </td>
                <td>
                  <NumericFormat
                    value={country.active}
                    displayType="text"
                    thousandSeparator
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {countries.length === 0 && (
        <p className="text-center p-5 text-danger">Data Tidak Ditemukan</p>
      )}
    </div>
  );
}

export default TableCountry;
