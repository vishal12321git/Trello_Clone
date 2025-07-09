/* eslint-disable max-len */
import List from '@/components/List'
import { fetchAllListsOfABoard } from '@/utils/FetchApi'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GoPlus } from 'react-icons/go'
import ListDialog from '@/components/ListDialog'
import { AllBoardsContext } from '@/contexts/AllBoardsContext'


const SingleBoardPage = () => {
  const { id } = useParams()
  const [isListDialogOpen, setIsListDialogOpen] = useState(false)
  const [lists, setLists] = useState([])
  const { allBoards } = useContext(AllBoardsContext)

  const board = allBoards.find((board) => board.id === id)
  console.log(board)

  const backgroundImage = board?.prefs?.backgroundImage
  const backgroundColor = board?.prefs?.backgroundColor || '#f4f5f7'

  useEffect(() => {
    const fetchAllIds = async () => {
      const res = await fetchAllListsOfABoard(id)
      setLists(res)
    }
    fetchAllIds()
  }, [id])


  function handleClickAddList() {
    setIsListDialogOpen(true)
  }

  if (!board) {
    return <div className="p-6 text-lg font-medium">Loading board...</div>
  }

  return (
    <div className={`min-h-screen bg-cover bg-no-repeat bg-center pt-4`}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundColor: backgroundImage ? undefined : backgroundColor,
      }}>
      <h2 className='text-3xl text-white font-bold px-5 '>
        {board?.name || 'Loading board...'}
      </h2>
      <div className='mx-5  flex gap-4 mt-4 overflow-x-scroll'>
        {lists.map((list) => (
          <div key={list.id} className="flex-shrink-0 w-66">
            <List list={list} key={id} id={id} lists={lists} setLists={setLists} />
          </div>
        ))}
        {isListDialogOpen ?
          <ListDialog setIsListDialogOpen={setIsListDialogOpen} boardId={id} lists={lists} setLists={setLists} /> :
          <div className='flex-shrink-0 flex gap-3 items-center border-1 rounded w-66 h-12 px-4 hover:bg-gray-200 bg-white'
            onClick={handleClickAddList}>
            <GoPlus className='text-lg' />
            <span >Add another list</span>
          </div>
        }
      </div>
    </div>
  )
}

export default SingleBoardPage
