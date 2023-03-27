// @ts-nocheck
import { BiStats } from 'react-icons/bi';
import dayjs from 'dayjs';
import ReactApexChart from 'react-apexcharts';
import { Spinner } from '@/components/atoms';

type Props = {
  cases: any[]
  recovered: any[]
  deaths: any[]
  isLoading: boolean
  keyChart: any[]
  title?: string
}

function MainChart({
  cases, recovered, deaths, isLoading, keyChart, title
}: Props) {
  const data = {
    series: [
      {
        name: 'Kasus',
        data: cases || []
      },
      {
        name: 'Meninggal',
        data: deaths || []
      },
      {
        name: 'Pulih',
        data: recovered || []
      }
    ],
    options: {
      chart: {
        type: 'area',
        stacked: false,
        height: 350,
        zoom: {
          enabled: true,
          type: 'x',
          autoScaleYaxis: false,
          zoomedArea: {
            fill: {
              color: '#90CAF9',
              opacity: 0.4
            },
            stroke: {
              color: '#0D47A1',
              opacity: 0.4,
              width: 1
            }
          }
        },
      },
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 0,
      },
      xaxis: {
        type: 'category',
        tickAmount: 8,
        categories: keyChart,
        labels: {
          rotate: -15,
          rotateAlways: true,
          formatter: function(value) {
            return dayjs(new Date(value)).format('DD MM YYYY');
          },
        }
      },
      tooltip: {
        shared: true
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
      }
    },
  };
  return (
    <div className="card main-card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="card-header-title font-16 text-muted">{title}</h5>
        <span className="text-muted">
          <BiStats size="25px" />
        </span>
      </div>
      <div className="card-body">
        {isLoading ? (
          <Spinner size="lg" />
        ) : (
          <div className="App">
            <p className="text-semi font-13">
              Dari:
              {' '}
              <span className="font-weight-bold">
                <span>{dayjs(keyChart[0]).format('DD MMM YYYY hh:mm')}</span>
                {' '}
                -
                {' '}

                <span>{dayjs(keyChart[keyChart.length - 1]).format('DD MMM YYYY hh:mm')}</span>
                {' (Kumulatif)'}
              </span>
            </p>
            {' '}
            <ReactApexChart options={data.options} series={data.series} type="area" height={350} />
          </div>
        )}
      </div>
    </div>
  );
}

export default MainChart;
MainChart.defaultProps = {
  title: '-'
};
