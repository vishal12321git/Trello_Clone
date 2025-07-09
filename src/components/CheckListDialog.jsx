import useClickOutside from '@/hooks/useClickOutside'
import { createChecklist } from '@/utils/FetchApi'
import React, { useEffect, useRef, useState } from 'react'
import { RxCross2 } from 'react-icons/rx'

const CheckListDialog = ({
  setIsCheckListDialogOpen,
  cardId,
  allCheckLists,
  setAllCheckLists,
}) => {
  const [title, setTitle] = useState('')
  const inputRef = useRef(null)
  const dialogRef = useRef(null)
  const handleSubmitForm = async (e) => {
    e.preventDefault()
    const res = await createChecklist(cardId, title)
    if (res?.id) {
      setAllCheckLists([...allCheckLists, res])
      setIsCheckListDialogOpen(false)
    }
  }
  useEffect(() => {
    inputRef?.current.focus()
  }, [])
  useClickOutside(dialogRef, () => setIsCheckListDialogOpen(false))
  return (
    <div className=' w-66 ml-5 mt-1 border-1 rounded'>
      <div className='flex p-2 items-center'>
        <div className='w-full text-center'>Add checklist</div>
        <RxCross2
          className='text-xl border-1 h-9 w-9 px-1 rounded hover:bg-gray-200'
          onClick={() => setIsCheckListDialogOpen(false)} />
      </div>
      <form
        onSubmit={handleSubmitForm}
        className='flex-shrink-0 flex flex-col px-4 h-fit rounded'
        ref={dialogRef}>
        <label>Title</label>
        <input
          type='text'
          className='border-1 h-10 w-full rounded'
          onChange={(e) => setTitle(e.target.value)}
          ref={inputRef} />
        <button
          className='border-1 w-15 rounded px-1 h-10 my-2 hover:bg-gray-200'
          type='submit'>Add</button>
      </form>
    </div>

  )
}

export default CheckListDialog
