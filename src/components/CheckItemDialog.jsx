/* eslint-disable max-len */
import { createCheckItem } from '@/utils/FetchApi'
import React, { useState } from 'react'

const CheckItemDialog = ({ setIsItemDialogOpen, checklist, allItems, setAllItems }) => {
  const [itemName, setItemName] = useState('')
  const handleFormSubmit = async (e)=>{
    e.preventDefault()
    const res = await createCheckItem(checklist.id, itemName)
    if (res?.id) {
      setAllItems([...allItems, res])
    }
    setItemName('')
  }

  return (
    <form
      onSubmit={handleFormSubmit}
      className='flex-shrink-0 flex flex-col gap-3 border-1 w-66  px-4 py-3 h-fit rounded'>
      <input type='text' className='border-1 h-10 w-full rounded' placeholder='Add an item' onChange={(e) => setItemName(e.target.value)} value={itemName}/>
      <div className='flex  gap-3 h-10 items-center'>
        <button className='border-1 rounded px-2 h-full' type='submit'>Add</button>
        <button className='border-1 rounded px-2 h-full' onClick={()=>setIsItemDialogOpen((prevState)=>!prevState)}>Cancel</button>
      </div>
    </form>
  )
}

export default CheckItemDialog
