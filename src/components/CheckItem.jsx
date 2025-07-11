import React, { useState } from 'react'
import { Checkbox, Typography, Button, Tooltip, Space } from 'antd'
import { TbHttpDelete } from 'react-icons/tb'
import EditItemDialog from './EditItemDialog'
import { deleteCheckItem, updateCheckItemState } from '@/utils/FetchApi'

const { Text, Paragraph } = Typography

const MAX_LENGTH = 80

const CheckItem = ({ item, checklist, allItems, setAllItems }) => {
  const [isEditItemDialogOpen, setIsEditItemDialogOpen] = useState(false)

  const isChecked = item.state === 'complete'

  const handleCheckboxChange = async (e) => {
    const checked = e.target.checked
    try {
      await updateCheckItemState(checklist.idCard, item.id, checked)
      setAllItems(allItems.map((i) =>
        i.id === item.id ?
          { ...i, state: checked ? 'complete' : 'incomplete' } :
          i,
      ))
    } catch (error) {
      console.error('Error updating check item state:', error)
    }
  }

  const handleDelete = async () => {
    try {
      const res = await deleteCheckItem(checklist.id, item.id)
      if (res.status === 200) {
        setAllItems(allItems.filter((i) => i.id !== item.id))
      }
    } catch (err) {
      console.error('Failed to delete check item:', err)
    }
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

      <TbHttpDelete
        className="text-xl text-red-500 cursor-pointer hover:text-red-600"
        onClick={handleDelete}
      />
    </div>
  )
}

export default CheckItem

