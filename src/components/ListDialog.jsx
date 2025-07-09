import useClickOutside from '@/hooks/useClickOutside'
import { createList } from '@/utils/FetchApi'
import React, { useEffect, useRef, useState } from 'react'
import { RxCross2 } from 'react-icons/rx'

const ListDialog = ({ setIsListDialogOpen, boardId, lists, setLists }) => {
  const [listName, setListName] = useState('')
  const inputRef = useRef(null)
  const dialogRef = useRef(null)

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    if (!listName || listName == '') {
      return
    }
    const res = await createList(listName, boardId)
    if (res?.id) {
      setLists([res, ...lists])
      setListName('')
    }
  }

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useClickOutside(dialogRef, () => setIsListDialogOpen(false))
  return (
    <form
      onSubmit={handleFormSubmit}
      className='flex-shrink-0 flex flex-col gap-3 border-1 w-66
      px-4 py-3 h-fit rounded bg-white'
      ref={dialogRef}>
      <input type='text'
        className='border-1 h-10 w-full rounded'
        placeholder='Enter list name...'
        onChange={(e) => setListName(e.target.value)}
        value={listName}
        ref={inputRef} />
      <div className='flex  gap-3 h-10 items-center'>
        <button
          className='border-1 rounded px-2 h-full hover:bg-gray-200'
          type='submit'>Add List</button>
        <RxCross2
          className='text-xl border-1 h-9 w-9 px-1 hover:bg-gray-200 rounded'
          onClick={() => setIsListDialogOpen(false)} />
      </div>
    </form>
  )
}

export default ListDialog
