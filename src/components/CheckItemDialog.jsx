import useClickOutside from '@/hooks/useClickOutside'
import React, { useEffect, useRef, useState } from 'react'
import { Form, Input, Button, Space } from 'antd'
import { addCheckItem } from '@/services/checkItem'

const CheckItemDialog = ({
  setIsItemDialogOpen,
  checklist,
  allItems,
  setAllItems,
}) => {
  const [itemName, setItemName] = useState('')
  const inputRef = useRef(null)
  const dialogRef = useRef(null)

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    if (!itemName.trim()) return

    const res = await addCheckItem(checklist.id, itemName)
    if (res?.id) {
      setAllItems([...allItems, res])
      setItemName('')
    }
  }

  useEffect(() => {
    inputRef?.current?.focus()
  }, [])

  useClickOutside(dialogRef, () => setIsItemDialogOpen(false))

  return (
    <div
      ref={dialogRef}
      className="bg-white border p-4 rounded-lg shadow-md w-full max-w-md"
    >
      <Form onSubmitCapture={handleFormSubmit}>
        <Form.Item>
          <Input
            placeholder="Add an item"
            ref={inputRef}
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
            <Button onClick={() => setIsItemDialogOpen(false)}>Cancel</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
}

export default CheckItemDialog

