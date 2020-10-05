import React from 'react'

function Spinner({ type, size }) {
  return (
    <div className='text-center'>
      <div
        className={`spinner-${type ? type : 'border'} spinner-${
          type ? type : 'border'
        }-${size ? size : 'sm'}`}
        role='status'
      >
        <span className='sr-only'>Loading...</span>
      </div>
    </div>
  )
}

export default Spinner
