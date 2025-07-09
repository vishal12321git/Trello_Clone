import useClickOutside from '@/hooks/useClickOutside'
import { createCheckItem } from '@/utils/FetchApi'
import React, { useEffect, useRef, useState } from 'react'

const CheckItemDialog = ({
  setIsItemDialogOpen,
  checklist,
  allItems,
  setAllItems,
}) => {
  const [itemName, setItemName] = useState('')
  const inputRef = useRef(null)
  const dialogRef = useRef(null)

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const res = await createCheckItem(checklist.id, itemName)
    if (res?.id) {
      setAllItems([...allItems, res])
    }
    setItemName('')
  }
  useEffect(() => {
    inputRef?.current.focus()
  }, [])
  useClickOutside(dialogRef, () => setIsItemDialogOpen(false))
  return (
    <form
      onSubmit={handleFormSubmit}
      className='flex-shrink-0 flex flex-col gap-3 border-1
      w-66 px-4 py-3 h-fit rounded'
      ref={dialogRef}>
      <input type='text'
        className='border-1 h-10 w-full rounded'
        placeholder='Add an item'
        onChange={(e) => setItemName(e.target.value)}
        value={itemName}
        ref={inputRef} />
      <div className='flex  gap-3 h-10 items-center'>
        <button className='border-1 rounded px-2 h-full hover:bg-gray-200'
          type='submit'>Add</button>
        <button className='border-1 rounded px-2 h-full hover:bg-gray-200'
          onClick={() => setIsItemDialogOpen((prevState) => !prevState)}
        >Cancel</button>
      </div>
    </form>
  )
}

export default CheckItemDialog
