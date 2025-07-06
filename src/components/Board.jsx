import React from 'react'
import focus1 from '../assets/focus1.png'

const board = ({ name }) => {
  return (
    <div className='rounded-md border-1 overflow-hidden' >
      <div className='h-20  rounded'>
        <img src={focus1} alt="" className='object-cover h-full w-full' />
      </div>
      <div className='text-center py-2'>{name}</div>
    </div>
  )
}

export default board
