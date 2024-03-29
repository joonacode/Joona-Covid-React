import './main-card.css';
import CountUp from 'react-countup';
import { BiStats } from 'react-icons/bi';
import { Spinner } from '@/components/atoms';

type Props = {
  title: string
  isLoading: boolean
  cases: number
  recovered: number
  deaths: number
  isTotal?: boolean
}

function MainCard({
  title, isLoading, cases, recovered, deaths, isTotal
}: Props) {
  return (
    <div
      className={`card main-card${isTotal ? ' border-red' : ' border-blue'}`}
    >
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="card-header-title font-16 text-muted">
          {isLoading ? <Spinner /> : title}
        </h5>
        <span className="text-muted">
          <BiStats size="25px" />
        </span>
      </div>
      <div className="card-body text-semi">
        {isLoading ? (
          <div className="my-5 mx-3">
            <Spinner />
          </div>
        ) : (
          <>
            <div className="text-center">
              <CountUp
                className="font-20 font-weight-bold"
                end={cases}
                separator="."
              />
              <small className="d-block"> Total Kasus </small>
            </div>
            <div className="row mt-4">
              <div className="col-md-6 mb-3">
                <div className="text-center">
                  <CountUp
                    className="font-18 font-weight-bold text-success"
                    end={recovered}
                    separator="."
                  />
                  <small className="d-block"> Total Pulih </small>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="text-center">
                  <CountUp
                    className="font-18 font-weight-bold text-danger"
                    end={deaths}
                    separator="."
                  />
                  <small className="d-block"> Total Meninggal </small>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MainCard;
MainCard.defaultProps = {
  isTotal: false
};
