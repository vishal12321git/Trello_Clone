import List from '@/components/List'

import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ListDialog from '@/components/ListDialog'
import { AllBoardsContext } from '@/contexts/AllBoardsContext'
import { Button } from 'antd'
import { fetchListsOfBoard } from '@/services/lists'


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
    const loadLists = async () => {
      const res = await fetchListsOfBoard(id)
      setLists(res)
    }
    loadLists()
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
      <div className='w-full overflow-hidden break-words'>
        <h2 className='text-3xl text-white font-bold px-5 '>
          {board?.name || 'Loading board...'}
        </h2>
      </div>

      <div className='mx-5  flex gap-4 mt-4 min-h-screen overflow-x-auto '>
        {lists.map((list) => (
          <div key={list.id} className="flex-shrink-0 max-w-66">
            <List
              list={list}
              key={id}
              id={id}
              lists={lists}
              setLists={setLists} />
          </div>
        ))}
        {isListDialogOpen ?
          <ListDialog
            setIsListDialogOpen={setIsListDialogOpen}
            boardId={id}
            lists={lists}
            setLists={setLists} /> :

          <Button
            type="primary"
            className='w-66'
            onClick={handleClickAddList}
          >Add another list</Button>

        }
      </div>
    </div>
  )
}

export default SingleBoardPage
