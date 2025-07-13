import React, { useState } from 'react'
import { Checkbox, Typography, Button } from 'antd'
import EditItemDialog from './Dialogs/EditItemDialog'
import { removeCheckItem, updateCheckItemState } from '@/services/checkItem'
import { MdDelete } from 'react-icons/md'

const { Paragraph } = Typography
const CheckItem = ({ item, checklist, allItems, setAllItems }) => {
  const [isEditItemDialogOpen, setIsEditItemDialogOpen] = useState(false)
  const [isCheckItemDeleting, setIsCheckItemDeleting] = useState(false)
  const isChecked = item.state === 'complete'

  const handleCheckboxChange = async (e) => {
    const isChecked = e.target.checked
    await updateCheckItemState(checklist.idCard, item.id, isChecked)

    const updatedCheckItems = allItems.map((checkItem) =>
      checkItem.id === item.id ?
        { ...checkItem, state: isChecked ? 'complete' : 'incomplete' } :
        checkItem,
    )

    setAllItems(updatedCheckItems)
  }

  const handleDelete = async () => {
    setIsCheckItemDeleting(true)
    const res = await removeCheckItem(checklist.id, item.id)
    if (res.status === 200) {
      setAllItems(
        (prev) => prev.filter((currItem) => currItem.id !== item.id),
      )
    }
    setIsCheckItemDeleting(false)
  }
  return (
    <div className="flex items-start gap-3 mb-2 w-full">
      <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
      <div className="flex-1 w-full">
        {isEditItemDialogOpen ? (
          <EditItemDialog
            setIsEditItemDialogOpen={setIsEditItemDialogOpen}
            item={item}
            checklist={checklist}
            allItems={allItems}
            setAllItems={setAllItems}
          />
        ) : (
          <div
            className="bg-gray-50 hover:bg-gray-100 px-3
            py-1 rounded-md cursor-pointer transition"
            onClick={() => setIsEditItemDialogOpen(true)}
          >
            <Paragraph
              style={{
                margin: 0,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                textDecoration: isChecked ? 'line-through' : 'none',
              }}
            >
              {item.name}
            </Paragraph>
          </div>
        )}
      </div>
      <Button
        icon={<MdDelete />}
        loading={isCheckItemDeleting}
        onClick={() => handleDelete()}
      />
    </div>
  )
}

export default CheckItem

