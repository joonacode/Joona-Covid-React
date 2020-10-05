import React from 'react'
import { FightImage } from '../../../assets'
import MainNavbar from '../MainNavbar'
import { RiVirusFill } from 'react-icons/ri'
import { GiHealthIncrease } from 'react-icons/gi'
import { FaSadTear } from 'react-icons/fa'
import Moment from 'react-moment'
import './main-header.css'
import CardCaseHeader from '../CardCaseHeader'
import { Spinner } from '../../atoms'
const MainHeader = ({ totalCase, recovered, death, isLoading, lastUpdate }) => {
  return (
    <div>
      <MainNavbar />
      <div className='bg-header'>
        <div className='container'>
          <div id='header'>
            <div className='row'>
              <div className='col-md-5 pr-5'>
                <img
                  src={FightImage}
                  alt='imageCorona'
                  className='img-fluid w-100 h-auto '
                />
              </div>
              <div className='col-md-7'>
                <h1 className='header-title'>
                  Bantu Mencegah Penyebaran Dengan Tetap <br />
                  Diam Dirumah
                </h1>
                <div className='mt-5 text-white'>
                  <div className='row '>
                    <div className='col-md-6 mb-4'>
                      <p className='mb-0 font-18'>Kasus di seluruh dunia</p>
                      <p className='mb-3 font-15'>
                        Terakhir diperbarui:{' '}
                        <Moment format='DD-MM-YYYY hh:mm'>{lastUpdate}</Moment>
                      </p>
                    </div>
                    {isLoading ? (
                      <Spinner />
                    ) : (
                      <>
                        <CardCaseHeader title='Total Kasus' total={totalCase}>
                          <RiVirusFill size='28px' />
                        </CardCaseHeader>
                        <CardCaseHeader title='Pulih' total={recovered}>
                          <GiHealthIncrease size='28px' />
                        </CardCaseHeader>
                        <CardCaseHeader title='Meninggal' total={death}>
                          <FaSadTear size='28px' />
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
  )
}

export default MainHeader
