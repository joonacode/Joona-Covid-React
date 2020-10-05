import React from 'react'
import { BiStats } from 'react-icons/bi'
import { Line } from 'react-chartjs-2'
import { Spinner } from '../../atoms'

function MainChart({ cases, recovered, deaths, isLoading, keyChart, title }) {
  const data = {
    labels: keyChart,
    datasets: [
      {
        label: 'Kasus',
        data: cases,
        fill: true,
        backgroundColor: 'rgba(130, 75, 192, 0.2)',
        borderColor: 'rgba(130, 75, 192, 1)',
        pointRadius: 2,
        borderWidth: 1,
        lineTension: 0,
      },
      {
        label: 'Meninggal',
        data: deaths,
        fill: true,
        backgroundColor: 'rgba(192, 75, 75, 0.2)',
        borderColor: 'rgba(192, 75, 75, 1)',
        pointRadius: 2,
        borderWidth: 1,
        lineTension: 0,
      },
      {
        label: 'Pulih',
        data: recovered,
        fill: true,
        backgroundColor: 'rgba(95, 192, 75, 0.2)',
        borderColor: 'rgba(95, 192, 75, 1)',
        pointRadius: 2,
        borderWidth: 1,
        lineTension: 0,
      },
    ],
  }

  const options = {
    scales: {
      xAxes: [
        {
          type: 'time',
          time: {
            unit: 'week',
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            callback: function (label, index, labels) {
              return label.toLocaleString(navigator.language, {
                minimumFractionDigits: 0,
              })
            },
          },
        },
      ],
    },
  }

  return (
    <div className='card main-card'>
      <div className='card-header d-flex justify-content-between align-items-center'>
        <h5 className='card-header-title font-16 text-muted'>{title}</h5>
        <span className='text-muted'>
          <BiStats size='25px' />
        </span>
      </div>
      <div className='card-body'>
        {isLoading ? (
          <Spinner size='lg' />
        ) : (
          <div className='App'>
            <p className='text-semi font-16'>Data 30 hari terakhir</p>
            <Line data={data} options={options} />
          </div>
        )}
      </div>
    </div>
  )
}

export default MainChart
