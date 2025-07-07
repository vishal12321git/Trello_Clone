/* eslint-disable max-len */
import React, { useContext, useState } from 'react'
import { InputWithText } from './InputWithText'
import { RxCross2 } from 'react-icons/rx'
import { createBoard } from '@/utils/FetchApi'
import { AllBoardsContext } from '@/contexts/AllBoardsContext'

const Dialog = () => {
  const [title, setTitle] = useState('')
  const { setIsDialogOpen, allBoards, setAllBoards } = useContext(AllBoardsContext)

  const handleSubmitForm = async (e) => {
    e.preventDefault()
    const newBoard = await createBoard(title)
    console.log(newBoard)
    if (newBoard?.id) {
      setAllBoards([newBoard, ...allBoards])
      console.log(allBoards)
      setIsDialogOpen(false)
    }
  }

  return (
    <form
      className='absolute top-25   sm:top-20  -right-full sm:-left-13 border-1 min-w-60 md:min-w-60 px-3 py-5 flex flex-col bg-gray-200 rounded'
      onSubmit={handleSubmitForm}
    >
      <div className='flex justify-between items-center'>
        <h3>Create new board</h3>
        <RxCross2 />
      </div>

      <InputWithText
        className={'mt-4'}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button
        className='px-2 py-1 border-1 rounded mt-6 m-auto border-black'
        type='submit'
      >
        Create
      </button>
    </form>
  )
}

export default Dialog
