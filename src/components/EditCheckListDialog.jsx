import { updateChecklistName } from '@/utils/FetchApi'
import React, { useState } from 'react'

const EditCheckListDialog = ({ setIsCheckListDialogOpen, checkList,
  allCheckLists, setAllCheckLists }) => {
  const [editedTitle, setEditedTitle] = useState('')

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const res = await updateChecklistName(checkList.id, editedTitle)
    setIsCheckListDialogOpen(false)
    const updatedItems = allCheckLists.map((singleChecklist) =>
      singleChecklist.id === checkList.id ?
        { ...singleChecklist, name: res.data.name } : singleChecklist,
    )
    setAllCheckLists(updatedItems)
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
        <button className='border-1 rounded px-2 h-full'
          type='submit'>Save</button>
        <button className='border-1 rounded px-2 h-full'
          onClick={() => setIsCheckListDialogOpen((prevState) => !prevState)}>
          Cancel</button>
      </div>
    </form>
  )
}

export default EditCheckListDialog
