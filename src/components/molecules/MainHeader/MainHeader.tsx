import { RiVirusFill } from 'react-icons/ri';
import { GiHealthIncrease } from 'react-icons/gi';
import { FaSadTear } from 'react-icons/fa';
import dayjs from 'dayjs';
import './main-header.css';
import { Spinner } from '../../atoms';
import { MainNavbar } from '../MainNavbar';
import { ImageHeader } from '../ImageHeader';
import { CardCaseHeader } from '../CardCaseHeader';

type Props = {
  totalCase: number
  recovered: number
  death: number
  isLoading: boolean
  lastUpdate?: string
}

function MainHeader({
  totalCase, recovered, death, isLoading, lastUpdate
}: Props) {
  return (
    <div>
      <MainNavbar />
      <div className="bg-header">
        <div className="container">
          <div id="header">
            <div className="row">
              <div className="col-lg-5 col-md-4 image-header-section">
                <h1 className="header-title text-center d-none title-image mb-5">
                  Lindungi Diri Anda Dari Virus Dengan
                  <span className="mb-0"> Menggunakan Masker, </span>
                  <span className="mb-0"> Cuci Tangan & </span>
                  <span className="mb-0"> Jaga Jarak Aman </span>
                </h1>
                <ImageHeader />
              </div>
              <div className="col-lg-7 pl-5 col-md-8" id="right-head">
                <h1 className="header-title header-title-right">
                  Lindungi Diri Anda Dari Virus Dengan
                  <span className="mb-0"> Menggunakan Masker, </span>
                  <span className="mb-0"> Cuci Tangan & </span>
                  <span className="mb-0"> Jaga Jarak Aman </span>
                </h1>
                <div className="mt-5 text-white">
                  <div className="row ">
                    <div className="col-lg-6 col-md-12 mb-4">
                      <p className="mb-0 font-18">Kasus di seluruh dunia</p>
                      {lastUpdate && (
                        <p className="mb-3 font-15">
                          Terakhir diperbarui:
                          {' '}
                          {dayjs(lastUpdate).format('DD-MM-YYYY hh:mm')}
                        </p>
                      )}
                    </div>
                    {isLoading ? (
                      <div className="col-md-12">
                        <Spinner size="lg" />
                      </div>
                    ) : (
                      <>
                        <CardCaseHeader
                          title="Total Kasus"
                          isCase
                          total={totalCase}
                        >
                          <RiVirusFill size="28px" />
                        </CardCaseHeader>
                        <CardCaseHeader title="Pulih" total={recovered}>
                          <GiHealthIncrease size="28px" />
                        </CardCaseHeader>
                        <CardCaseHeader title="Meninggal" total={death}>
                          <FaSadTear size="28px" />
                        </CardCaseHeader>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainHeader;
MainHeader.defaultProps = {
  lastUpdate: undefined
};
