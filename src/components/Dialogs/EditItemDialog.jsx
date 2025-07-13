import React, { useEffect, useRef, useState } from 'react'
import { Form, Input, Button, Space } from 'antd'
import useClickOutside from '@/hooks/useClickOutside'
import { updateCheckItemName } from '@/services/checkItem'

const EditItemDialog = ({
  setIsEditItemDialogOpen,
  item,
  checklist,
  setAllItems,
  allItems,
}) => {
  const [editedTitle, setEditedTitle] = useState(item.name || '')
  const cardId = checklist.idCard
  const inputRef = useRef(null)
  const dialogRef = useRef(null)

  const handleFormSubmit = async () => {
    if (!editedTitle.trim()) return
    const res = await updateCheckItemName(cardId, item.id, editedTitle)
    const updatedItems = allItems.map((singleItem) =>
      singleItem.id === item.id ?
        { ...singleItem, name: res.data.name } :
        singleItem,
    )
    setAllItems(updatedItems)
    setIsEditItemDialogOpen(false)
  }
  useEffect(() => {
    inputRef?.current?.focus()
  }, [])
  useClickOutside(dialogRef, () => setIsEditItemDialogOpen(false))

  return (
    <div
      ref={dialogRef}
      className="w-full bg-white border rounded p-3 shadow-sm">
      <Form onFinish={handleFormSubmit}>
        <Form.Item>
          <Input
            ref={inputRef}
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            placeholder="Edit item name"
          />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
            <Button onClick={() => setIsEditItemDialogOpen(false)}>
              Cancel
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
}

export default EditItemDialog

