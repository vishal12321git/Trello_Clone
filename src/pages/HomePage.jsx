/* eslint-disable max-len */
import BoardsContainer from '@/components/BoardsContainer'
import { Input } from '@/components/ui/input'
import React from 'react'


const HomePage = () => {
  return (
    <div className='w-11/12 m-auto py-4'>
      <div className='mt-10 flex justify-between gap-8'>
        <div className=' text-2xl font-bold'>Boards</div>

        <input type='text' id='search' className='w-full max-w-52  flex-shrink border-1 py-1 px-2 rounded block sm:hidden' placeholder='Search'></input>

      </div>

      <BoardsContainer />
    </div>
  )
}

export default HomePage
