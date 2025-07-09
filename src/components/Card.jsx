import React, { useState } from 'react'
import { FaCheck } from 'react-icons/fa'
import CardModal from './CardModal'
import { TbHttpDelete } from 'react-icons/tb'
import { deleteCard } from '@/utils/FetchApi'

const Card = ({ card, list, cards, setCards }) => {
  const [checked, setChecked] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleDelete = async (e) => {
    e.stopPropagation()
    try {
      const res = await deleteCard(card.id)
      if (res.status == 200) {
        const updatedCards = cards.filter((c) => c.id !== card.id)
        setCards(updatedCards)
      }
    } catch (err) {
      console.log('Error while deleting card', err)
    }
  }

  return (
    <>
      <div
        className="flex justify-between items-center border-1
        min-h-10 rounded px-2
        cursor-pointer group transition-all duration-300"
        onClick={() => setIsModalOpen(true)}
      >
        <div
          className={`w-5 h-5 rounded-full flex items-center justify-center 
            border transition-opacity duration-300 mr-2
            ${checked ?
      'bg-green-600 border-black opacity-100' :
      'opacity-0 group-hover:opacity-100'}
          `}
          onClick={(e) => {
            e.stopPropagation()
            setChecked(!checked)
          }}
        >
          {checked && <FaCheck className="text-white text-xs" />}
        </div>

        <span
          className={`transition-transform duration-300 ${checked ?
            'translate-x-2' :
            'group-hover:translate-x-2'
          }`}
        >
          {card.name}
        </span>
        <TbHttpDelete
          onClick={(e) => handleDelete(e)}
          className='text-xl hover:text-red-400' />
      </div>

      <CardModal
        list={list}
        card={card}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        checked={checked}
        setChecked={setChecked}>
        <h2 className="text-xl font-semibold mb-4">Card Details</h2>
        <p>This is a modal for card: <strong>{card.name}</strong></p>
      </CardModal>
    </>
  )
}

export default Card
