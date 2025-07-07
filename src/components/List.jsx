/* eslint-disable max-len */
import React, { useEffect, useState } from 'react'
import Card from './Card'
import { GoPlus } from 'react-icons/go'
import { fetchCardsOfList } from '@/utils/FetchApi'

const List = ({ list }) => {
  const [cards, setCards] = useState([])
  useEffect(() => {
    const loadCards = async () => {
      const res = await fetchCardsOfList(list.id)
      setCards(res)
    }
    loadCards()
  }, [list.id])

  function handleClickAddCard() {
    {''}
  }
  return (
    <div className='flex flex-col gap-3 w-66 border-1 rounded justify-evenly py-3 px-3'>
      <div className='flex min-h-10 rounded border-1'>
        <input type="text" value={list.name} className='w-full' />
        <div className='px-3 hover:bg-gray-100 rounded text-xl'>...</div>
      </div>
      {/* <Card /> */}
      {cards.map((card) => (
        <Card card={card} />
      ))}
      <div className='flex gap-3 items-center border-1 rounded w-full min-h-10'>
        <GoPlus className='text-lg' />
        <span onClick={handleClickAddCard}>Add a card</span>
      </div>
    </div>
  )
}

export default List
