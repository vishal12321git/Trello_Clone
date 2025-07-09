/* eslint-disable max-len */
import React, { useEffect, useState } from 'react'
import Card from './Card'
import { GoPlus } from 'react-icons/go'
import { deleteList, fetchCardsOfList } from '@/utils/FetchApi'
import CardDialog from './CardDialog'
import { TbHttpDelete } from 'react-icons/tb'

const List = ({ list, lists, setLists }) => {
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
  const handleDelete = async () => {
    try {
      const res = await deleteList(list.id)
      if (res.status == 200) {
        const updatedLists = lists.filter((l) => l.id !== list.id)
        setLists(updatedLists)
        console.log(lists)
      }
    } catch (error) {
      console.log('error white archiving list', error)
    }
  }
  return (
    <div className='flex flex-col gap-3 w-66 border-1 rounded justify-evenly py-3 px-3 bg-white'>
      <div className='flex min-h-10 rounded border-b-2 border-blue-400 items-center'>
        <input type="text" value={list.name} className='w-full text-lg' disabled/>
        <TbHttpDelete className='mr-2 text-2xl hover:text-red-500' onClick={handleDelete} />
      </div>
      {/* <Card /> */}
      {cards.map((card) => (
        <Card card={card} list={list} cards={cards} setCards={setCards}/>
      ))}
      {isCardDialogOpen ?
        <CardDialog setIsCardDialogOpen={setIsCardDialogOpen} cards={cards} setCards={setCards} key={list.id} listId={list.id} /> :
        <div className='flex gap-3 items-center border-1 hover:bg-gray-200 rounded w-full min-h-10 pl-2'
          onClick={handleClickAddCard}>
          <GoPlus className='text-lg' />
          <div >Add a card</div>
        </div>
      }
    </div>
  )
}

export default List
