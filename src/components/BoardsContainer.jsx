import React from 'react'
import Board from '../components/Board'

const BoardsContainer = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6'>
      <Board name={'board1'}/>
      <Board name={'board1'}/>
      <Board name={'board1'}/>
      <Board name={'board1'}/>
      <Board name={'board1'}/>
      <Board name={'board1'}/>
      <Board name={'board1'}/>
      <div className='bg-gray-500 flex justify-center items-center rounded text-gray-200 h-full w-full'>Create new board</div>
    </div>
  )
}
export default BoardsContainer
