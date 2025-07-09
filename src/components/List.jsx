/* eslint-disable max-len */
import React, { useEffect, useState } from 'react'
import Card from './Card'
import { GoPlus } from 'react-icons/go'
import { fetchCardsOfList } from '@/utils/FetchApi'
import CardDialog from './CardDialog'

const List = ({ list }) => {
  const [cards, setCards] = useState([])
  const [isCardDialogOpen, setIsCardDialogOpen] = useState(false)
  useEffect(() => {
    const loadCards = async () => {
      const res = await fetchCardsOfList(list.id)
      setCards(res)
    }
    loadCards()
  }, [list.id])

  function handleClickAddCard() {
    setIsCardDialogOpen(true)
  }
  return (
    <div className='flex flex-col gap-3 w-66 border-1 rounded justify-evenly py-3 px-3'>
      <div className='flex min-h-10 rounded border-1'>
        <input type="text" value={list.name} className='w-full' />
        <div className='px-3 hover:bg-gray-100 rounded text-xl'>...</div>
      </div>
      {/* <Card /> */}
      {cards.map((card) => (
        <Card card={card} list={list}/>
      ))}
      {isCardDialogOpen ?
        <CardDialog setIsCardDialogOpen={setIsCardDialogOpen} cards={cards} setCards={setCards} key={list.id} listId={list.id}/> :
        <div className='flex gap-3 items-center border-1 rounded w-full min-h-10'>
          <GoPlus className='text-lg' />
          <div onClick={handleClickAddCard}>Add a card</div>
        </div>
      }
    </div>
  )
}

export default List
