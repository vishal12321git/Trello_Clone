/* eslint-disable max-len */
import React, { useContext } from 'react'
import Board from '../components/Board'
import { AllBoardsContext } from '@/contexts/AllBoardsContext'

const BoardsContainer = () => {
  const { allBoards, loading, error, setIsDialogOpen } = useContext(AllBoardsContext)

  if (loading) {
    return <div className="text-center py-4">Loading boards...</div>
  }

  if (error) {
    return <div className="text-center text-red-500 py-4">{error}</div>
  }

  return (
    <div className='grid grid-cols-[repeat(auto-fit,_minmax(280px,_1fr))] gap-8 mt-6 '>
      {allBoards.map((board) => (
        <Board name={board.name} bg={board.prefs.backgroundImage || board.prefs.backgroundColor} key={board.id} id={board.id} />
      ))}
      <div className='bg-gray-500 flex justify-center items-center rounded text-gray-200 h-29 max-w-70 w-full' onClick={() => setIsDialogOpen((prevState) => !prevState)}>Create new board</div>
    </div >
  )
}
export default BoardsContainer
