import React from 'react'
import { BiCaretRightCircle, BiPhone, BiMenu } from 'react-icons/bi'
import './main-navbar.css'
const MainNavbar = () => {
  return (
    <>
      <nav className='navbar py-3 navbar-expand-md navbar-dark bg-info sticky-top'>
        <div className='container'>
          <span className='navbar-brand font-weight-bold'>JoonaCovid</span>
          <button
            className='navbar-toggler d-lg-none'
            type='button'
            data-toggle='collapse'
            data-target='#collapsibleNavId'
            aria-controls='collapsibleNavId'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <BiMenu size='28px' />
          </button>
          <div className='collapse navbar-collapse' id='collapsibleNavId'>
            <div className='left-navbar ml-auto my-2 my-lg-0'>
              <a href='/' className='mr-4 text-white'>
                <span className='mr-1 '>
                  <BiCaretRightCircle size='30px' />
                </span>
                Bagaimana melindungi diri sendiri
              </a>
              <button
                className='btn btn-success call px-4 shadow-sm my-2 my-sm-0 rounded'
                type='button'
              >
                <span className='mr-1 '>
                  <BiPhone size='22px' />
                </span>{' '}
                Call Center 119
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default MainNavbar
