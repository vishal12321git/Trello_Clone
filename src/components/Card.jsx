import React, { useState } from 'react'
import { FaCheck } from 'react-icons/fa'
import CardModal from './CardModal'
import { TbHttpDelete } from 'react-icons/tb'
import { Col, Row } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { deleteCard } from '@/services/cards'

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
      <Row
        align="middle"
        className="border-1 min-h-10 rounded px-2
        cursor-pointer group transition-all duration-300"
        style={{ background: '#fff', marginBottom: '8px' }}
        onClick={() => setIsModalOpen(true)}
        wrap={false} // prevents wrapping of children
      >
        <Col flex="auto">
          <TextArea
            value={card.name}
            autoSize={{ minRows: 1, maxRows: 100 }}
            readOnly
            bordered={false}
            className="bg-transparent resize-none pointer-events-none"
          />
        </Col>
        <Col flex="32px">
          <TbHttpDelete
            onClick={(e) => {
              e.stopPropagation()
              handleDelete(e)
            }}
            className="text-xl hover:text-red-400"
          />
        </Col>
      </Row>

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
