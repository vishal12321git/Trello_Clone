/* eslint-disable max-len */
import React from 'react'
import { InputWithText } from './InputWithText'
import { RxCross2 } from 'react-icons/rx'

const Dialog = () => {
  return (
    <div className='absolute top-20 border-1 min-w-45 md:min-w-60 px-3 py-5 flex flex-col bg-gray-200 rounded'>
      <div className='flex justify-between items-center'>
        <h3>Create new board</h3>
        <RxCross2 />
      </div>
      <InputWithText className={'mt-4 '} />
      <button className='px-2 py-1 border-1 rounded mt-6 m-auto border-black'>Create</button>
    </div>
  )
}

export default Dialog
