import useClickOutside from '@/hooks/useClickOutside'
import { createCard } from '@/utils/FetchApi'
import React, { useEffect, useRef, useState } from 'react'
import { RxCross2 } from 'react-icons/rx'

const CardDialog = ({ setIsCardDialogOpen, cards, setCards, listId }) => {
  const [cardName, setCardName] = useState('')
  const inputRef = useRef(null)
  const dialogRef = useRef(null)

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    if (!cardName || cardName == '') {
      return
    }
    const res = await createCard(cardName, listId)
    if (res?.id) {
      setCards([res, ...cards])
    }
  }
  useEffect(() => {
    inputRef?.current.focus()
  }, [])

  useClickOutside(dialogRef, () => setIsCardDialogOpen(false))
  return (
    <form
      onSubmit={handleFormSubmit}
      className='flex-shrink-0 flex flex-col gap-3 h-fit rounded'
      ref={dialogRef}>
      <textarea
        rows={2}
        className='border-1 w-full rounded resize-none p-2'
        placeholder='Enter a title or paste a link'
        onChange={(e) => setCardName(e.target.value)}
        ref={inputRef}
      />
      <div className='flex  gap-3 h-10 items-center'>
        <button
          className='border-1 rounded px-2 h-full hover:bg-gray-200'
          type='submit'>Add Card</button>
        <RxCross2
          className='text-xl border-1 h-9 w-9 px-1 rounded hover:bg-gray-200'
          onClick={() => setIsCardDialogOpen(false)} />
      </div>
    </form>
  )
}

export default CardDialog
