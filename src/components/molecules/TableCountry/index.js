import React from 'react'
import { Spinner } from '../../atoms'
import NumberFormat from 'react-number-format'

function TableCountry({ countries, isLoading }) {
  return (
    <>
      <div
        className='table-responsive'
        style={{ maxHeight: '400px', overflow: 'auto' }}
      >
        <table className='table'>
          <thead>
            <tr>
              <th className='sticky-top bg-white' scope='col'>
                #
              </th>
              <th className='sticky-top bg-white' scope='col'>
                Negara
              </th>
              <th className='sticky-top bg-white' scope='col'>
                Total Kasus
              </th>
              <th className='sticky-top bg-white' scope='col'>
                Kasus Hari Ini
              </th>
              <th className='sticky-top bg-white' scope='col'>
                Total Meninggal
              </th>
              <th className='sticky-top bg-white' scope='col'>
                Meninggal Hari Ini
              </th>
              <th className='sticky-top bg-white' scope='col'>
                Total Pulih
              </th>
              <th className='sticky-top bg-white' scope='col'>
                Pulih Hari Ini
              </th>
              <th className='sticky-top bg-white' scope='col'>
                Kasus Aktif
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <Spinner />
            ) : (
              countries.map((country, i) => {
                return (
                  <tr key={i}>
                    <th scope='row'>{i + 1}</th>
                    <td>{country.country}</td>
                    <td>
                      <NumberFormat
                        value={country.cases}
                        displayType={'text'}
                        thousandSeparator={true}
                      />
                    </td>
                    <td>
                      <NumberFormat
                        value={country.todayCases}
                        displayType={'text'}
                        thousandSeparator={true}
                      />
                    </td>
                    <td>
                      {' '}
                      <NumberFormat
                        value={country.deaths}
                        displayType={'text'}
                        thousandSeparator={true}
                      />
                    </td>
                    <td
                      className={`${
                        country.todayDeaths > 0 ? 'bg-danger text-white' : ''
                      }`}
                    >
                      <NumberFormat
                        value={country.todayDeaths}
                        displayType={'text'}
                        thousandSeparator={true}
                      />
                    </td>
                    <td>
                      <NumberFormat
                        value={country.recovered}
                        displayType={'text'}
                        thousandSeparator={true}
                      />
                    </td>
                    <td
                      className={`${
                        country.todayRecovered > 0
                          ? 'bg-success text-white'
                          : ''
                      }`}
                    >
                      <NumberFormat
                        value={country.todayRecovered}
                        displayType={'text'}
                        thousandSeparator={true}
                      />
                    </td>
                    <td>
                      <NumberFormat
                        value={country.active}
                        displayType={'text'}
                        thousandSeparator={true}
                      />
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default TableCountry
