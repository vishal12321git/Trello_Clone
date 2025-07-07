/* eslint-disable max-len */
import List from '@/components/List'
import { fetchAllListsOfABoard } from '@/utils/FetchApi'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GoPlus } from 'react-icons/go'
import ListDialog from '@/components/ListDialog'

const SingleBoardPage = () => {
  const { id } = useParams()
  const [isListDialogOpen, setIsListDialogOpen] = useState(false)
  const [lists, setLists] = useState([])

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
  return (
    <div>
      <h2>board name</h2>
      <div className='mx-5  flex gap-4 mt-4 overflow-x-scroll'>
        {lists.map((list) => (
          <div key={list.id} className="flex-shrink-0 w-66">
            <List list={list} key={id} id={id}/>
          </div>
        ))}
        {isListDialogOpen ?
          <ListDialog setIsListDialogOpen={setIsListDialogOpen} boardId={id} lists={lists} setLists={setLists}/> :
          <div className='flex-shrink-0 flex gap-3 items-center border-1 rounded w-66 h-12 px-4 hover:bg-gray-200'>
            <GoPlus className='text-lg' />
            <span onClick={handleClickAddList}>Add another list</span>
          </div>
        }
      </div>
    </div>
  )
}

export default SingleBoardPage
