/* eslint-disable max-len */
import { createList } from '@/utils/FetchApi'
import React, { useState } from 'react'
import { RxCross2 } from 'react-icons/rx'

const ListDialog = ({ setIsListDialogOpen, boardId, lists, setLists }) => {
  const [listName, setListName] = useState('')
  const handleFormSubmit = async (e)=>{
    e.preventDefault()
    const res = await createList(listName, boardId)
    if (res?.id) {
      setLists([res, ...lists])
    }

    console.log(res)
  }
  return (
    <form
      onSubmit={handleFormSubmit}
      className='flex-shrink-0 flex flex-col gap-3 border-1 w-66  px-4 py-3 h-fit rounded'>
      <input type='text' className='border-1 h-10 w-full rounded' placeholder='Enter list name...' onChange={(e) => setListName(e.target.value)}/>
      <div className='flex  gap-3 h-10 items-center'>
        <button className='border-1 rounded px-2 h-full' type='submit'>Add List</button>
        <RxCross2 className='text-xl border-1  h-9 w-9 px-1' onClick={()=>setIsListDialogOpen(false)}/>
      </div>
    </form>
  )
}

export default ListDialog
