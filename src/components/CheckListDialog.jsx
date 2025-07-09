/* eslint-disable max-len */
import { createChecklist } from '@/utils/FetchApi'
import React, { useState } from 'react'
import { RxCross2 } from 'react-icons/rx'

const CheckListDialog = ({ setIsCheckListDialogOpen, cardId, allCheckLists, setAllCheckLists }) => {
  const [title, setTitle] = useState('')
  const handleSubmitForm = async (e)=>{
    e.preventDefault()
    const res = await createChecklist(cardId, title)
    if (res?.id) {
      setAllCheckLists([...allCheckLists, res])
      setIsCheckListDialogOpen(false)
    }
  }
  return (
    <div className='p-2 w-66 ml-5 mt-1'>
      <div className='flex p-2 border-1  items-center'>
        <div className='w-full text-center'>Add checklist</div>
        <RxCross2 className='text-xl border-1  h-9 w-9 px-1' onClick={()=>setIsCheckListDialogOpen(false)}/>
      </div>
      <form
        onSubmit={ handleSubmitForm }
        className='flex-shrink-0 flex flex-col border-1   px-4 py-3 h-fit rounded'>
        <label>Title</label>
        <input type='text' className='border-1 h-10 w-full rounded' onChange={(e) => setTitle(e.target.value)}/>
        <button className='border-1 w-20 rounded px-2 h-10 mt-3' type='submit'>Add</button>
      </form>
    </div>

  )
}

export default CheckListDialog
