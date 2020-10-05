import React from 'react'
import CountUp from 'react-countup'

function CardCaseHeader({ children, title, total }) {
  return (
    <div className='col-md-6 d-flex mb-4'>
      <span className='icon-header mr-3'>{children}</span>
      <div className='d-flex flex-column text-white'>
        <p className='mb-0'>{title}</p>
        <p className='mb-0 font-weight-bold font-20'>
          <CountUp end={total} separator='.' />
        </p>
      </div>
    </div>
  )
}

export default CardCaseHeader
