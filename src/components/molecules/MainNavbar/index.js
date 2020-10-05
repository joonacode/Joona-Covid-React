import React from 'react'
import { BiCaretRightCircle } from 'react-icons/bi'

const MainNavbar = () => {
  return (
    <>
      <nav className='navbar py-3 navbar-expand-md navbar-dark bg-info sticky-top'>
        <div className='container'>
          <span className='navbar-brand font-weight-bold'>
            Covid-19 Statistic
          </span>
          <button
            className='navbar-toggler d-lg-none'
            type='button'
            data-toggle='collapse'
            data-target='#collapsibleNavId'
            aria-controls='collapsibleNavId'
            aria-expanded='false'
            aria-label='Toggle navigation'
          ></button>
          <div className='collapse navbar-collapse' id='collapsibleNavId'>
            <div className='form-inline ml-auto my-2 my-lg-0'>
              <a href='/' className='mr-4 text-white'>
                <span className='mr-1 '>
                  <BiCaretRightCircle size='30px' />
                </span>
                Bagaimana melindungi diri sendiri
              </a>
              <button
                className='btn btn-primary px-4 shadow my-2 my-sm-0'
                type='button'
              >
                Kamu sakit ?
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default MainNavbar
