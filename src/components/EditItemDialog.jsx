import useClickOutside from '@/hooks/useClickOutside'
import { updateCheckItemName } from '@/services/checkItem'
import React, { useEffect, useRef, useState } from 'react'

const EditItemDialog = ({
  setIsEditItemDialogOpen,
  item,
  checklist,
  setAllItems,
  allItems,
}) => {
  const [editedTitle, setEditedTitle] = useState('')
  const CardId = checklist.idCard
  const inputRef = useRef(null)
  const dialogRef = useRef(null)

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const res = await updateCheckItemName(CardId, item.id, editedTitle)
    setIsEditItemDialogOpen(false)
    const updatedItems = allItems.map((singleItem) =>
      singleItem.id === item.id ?
        { ...singleItem, name: res.data.name } :
        singleItem,
    )
    setAllItems(updatedItems)
  }
  useEffect(() => {
    inputRef?.current.focus()
  }, [])
  useClickOutside(dialogRef, () => setIsEditItemDialogOpen(false))
  return (
    <form
      onSubmit={handleFormSubmit}
      className='w-full
       h-fit rounded'
      ref={dialogRef}>
      <input
        type='text'
        className='border-1 h-10 w-full rounded'
        value={editedTitle}
        onChange={(e) => setEditedTitle(e.target.value)}
        ref={inputRef}
      />
      <div className=' flex py-1 gap-3 h-10 '>
        <button
          className='border-1 rounded px-2 h-full hover:bg-gray-200'
          type='submit'>Save</button>
        <button
          className='border-1 rounded px-2 h-full hover:bg-gray-200'
          onClick={() => setIsEditItemDialogOpen((prevState) => !prevState)}>
          Cancel</button>
      </div>
    </form>
  )
}

export default EditItemDialog
