import { NumericFormat } from 'react-number-format';
import { Spinner } from '../../atoms';

type Props = {
  provincies: any[]
  isLoading: boolean
}

function TableCountry({ provincies, isLoading }: Props) {
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
              Provinsi
            </th>
            <th className="sticky-top bg-white" scope="col">
              Kasus
            </th>
            <th className="sticky-top bg-white" scope="col">
              Dirawat
            </th>
            <th className="sticky-top bg-white" scope="col">
              Sembuh
            </th>
            <th className="sticky-top bg-white" scope="col">
              Meninggal
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <Spinner />
          ) : (
            provincies.length > 0
            && provincies.map((provinci, i) => (
              <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{provinci.provinsi}</td>
                <td>
                  <NumericFormat
                    value={provinci.kasus}
                    displayType="text"
                    thousandSeparator
                  />
                </td>
                <td>
                  <NumericFormat
                    value={provinci.dirawat}
                    displayType="text"
                    thousandSeparator
                  />
                </td>
                <td>
                  {' '}
                  <NumericFormat
                    value={provinci.sembuh}
                    displayType="text"
                    thousandSeparator
                  />
                </td>
                <td>
                  <NumericFormat
                    value={provinci.meninggal}
                    displayType="text"
                    thousandSeparator
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {provincies.length === 0 && (
        <p className="text-center p-5 text-danger">Data Tidak Ditemukan</p>
      )}
    </div>
  );
}

export default TableCountry;
