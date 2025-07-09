/* eslint-disable max-len */
import { updateCheckItemName } from '@/utils/FetchApi'
import React, { useState } from 'react'

const EditItemDialog = ({ setIsEditItemDialogOpen, item, checklist, setAllItems, allItems }) => {
  const [editedTitle, setEditedTitle] = useState('')
  const CardId = checklist.idCard
  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const res = await updateCheckItemName(CardId, item.id, editedTitle)
    setIsEditItemDialogOpen(false)
    const updatedItems = allItems.map((singleItem) =>
      singleItem.id === item.id ? { ...singleItem, name: res.data.name } : singleItem,
    )
    setAllItems(updatedItems)
  }
  return (
    <form
      onSubmit={handleFormSubmit}
      className='w-full
       h-fit rounded'>
      <input
        type='text'
        className='border-1 h-10 w-full rounded'
        value={editedTitle}
        onChange={(e) => setEditedTitle(e.target.value)}
      />
      <div className=' flex py-1 gap-3 h-10 '>
        <button className='border-1 rounded px-2 h-full' type='submit'>Save</button>
        <button className='border-1 rounded px-2 h-full'
          onClick={() => setIsEditItemDialogOpen((prevState) => !prevState)}>
          Cancel</button>
      </div>
    </form>
  )
}

export default EditItemDialog
