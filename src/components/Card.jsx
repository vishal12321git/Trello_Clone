import React, { useState } from 'react'
import CardModal from './CardModal'
import { Button, Col, Row } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { deleteCard } from '@/services/cards'
import { MdDelete } from 'react-icons/md'

const Card = ({
  card,
  list,
  cards,
  setCards,
  deletingCardId,
  setDeletingCardId }) => {
  const [checked, setChecked] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleDelete = async (id) => {
    if (deletingCardId) return
    setDeletingCardId(id)
    const res = await deleteCard(card.id)
    if (res.status == 200) {
      const updatedCards = cards.filter(
        (existingCard) => existingCard.id !== card.id,
      )
      setCards(updatedCards)
    }
    setDeletingCardId(null)
  }
  return (
    <>
      <Row
        align="middle"
        className="border-1 min-h-10 rounded px-2
        cursor-pointer group transition-all duration-300"
        style={{ background: '#fff', marginBottom: '8px' }}
        wrap={false}
      >
        <Col flex="auto" onClick={() => setIsModalOpen(true)}>
          <TextArea
            value={card.name}
            autoSize={{ minRows: 1, maxRows: 100 }}
            readOnly
            variant="borderless"
            className="bg-transparent resize-none pointer-events-none"
          />
        </Col>
        <Col flex="32px">
          <Button
            icon={<MdDelete />}
            loading={deletingCardId === card.id}
            disabled={deletingCardId && deletingCardId !== card.id}
            onClick={() => handleDelete(card.id)}
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
