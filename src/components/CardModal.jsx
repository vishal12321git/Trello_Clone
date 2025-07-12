import React, { useEffect, useState } from 'react'
import { Modal, Typography, Button, Divider, Tooltip, Empty } from 'antd'
import { FiCheckSquare } from 'react-icons/fi'
import { RxCross2 } from 'react-icons/rx'
import CheckListDialog from './CheckListDialog'
import CheckList from './CheckList'
import { getChecklistsOfCard } from '@/services/checklist'

const { Title } = Typography

const CardModal = ({ card, isOpen, onClose }) => {
  const [isCheckListDialogOpen, setIsCheckListDialogOpen] = useState(false)
  const [allCheckLists, setAllCheckLists] = useState([])

  useEffect(() => {
    const loadCheckLists = async () => {
      const res = await getChecklistsOfCard(card.id)
      setAllCheckLists(res)
    }
    loadCheckLists()
  }, [card.id])

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={650}
      closeIcon={false}
      centered
      styles={{
        body: {
          maxHeight: '70vh',
          overflowY: 'auto',
          padding: '24px',
          background: '#fdfdfd',
          borderRadius: '10px',
          position: 'relative',
        },
      }}
    >
      <div
        className="absolute top-7 right-4 cursor-pointer hover:text-red-500"
        onClick={onClose}
      >
        <RxCross2 className="text-2xl transition-transform hover:scale-110" />
      </div>

      <Title
        level={4}
        className="m-0 mb-2 whitespace-nowrap
          text-ellipsis overflow-hidden max-w-[85%]"
      >
        {card.name}
      </Title>

      <div className="flex mb-3">
        <Button
          icon={<FiCheckSquare />}
          onClick={() => setIsCheckListDialogOpen((prev) => !prev)}
          type="primary"
        >
          Add Checklist
        </Button>
      </div>

      {isCheckListDialogOpen && (
        <CheckListDialog
          setIsCheckListDialogOpen={setIsCheckListDialogOpen}
          cardId={card.id}
          allCheckLists={allCheckLists}
          setAllCheckLists={setAllCheckLists}
        />
      )}

      <Divider />

      {allCheckLists.length > 0 ? (
        allCheckLists.map((checklist) => (
          <CheckList
            allCheckLists={allCheckLists}
            setAllCheckLists={setAllCheckLists}
            checklist={checklist}
            key={checklist.id}
            id={checklist.id}
          />
        ))
      ) : (
        <Empty
          description="No checklists added"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          style={{ marginTop: '2rem' }}
        />
      )}
    </Modal>
  )
}

export default CardModal
