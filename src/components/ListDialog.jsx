import React, { useEffect, useRef } from 'react'
import { Form, Input, Button } from 'antd'
import { RxCross2 } from 'react-icons/rx'
import useClickOutside from '@/hooks/useClickOutside'
import { createList } from '@/services/lists'


const ListDialog = ({ setIsListDialogOpen, boardId, lists, setLists }) => {
  const [form] = Form.useForm()
  const dialogRef = useRef(null)
  const inputRef = useRef(null)

  const handleFormSubmit = async (values) => {
    const listName = values.listName.trim()
    if (!listName) return

    const res = await createList(listName, boardId)
    if (res?.id) {
      setLists([...lists, res])
      form.resetFields()
    }
  }

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useClickOutside(dialogRef, () => setIsListDialogOpen(false))

  return (
    <div
      ref={dialogRef}
      className="flex-shrink-0 flex flex-col gap-3
      border-1 w-66 px-4 py-3 h-fit rounded bg-white"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFormSubmit}
      >
        <Form.Item
          name="listName"
          rules={[{ required: true, message: 'Please enter list name' }]}
        >
          <Input
            ref={inputRef}
            placeholder="Enter list name..."
            className="h-10"
          />
        </Form.Item>

        <div className="flex gap-3 items-center">
          <Button type="primary" htmlType="submit">
            Add List
          </Button>
          <RxCross2
            className="text-xl h-9 w-9 px-1 text-red-500
            hover:text-red-600 rounded cursor-pointer"
            onClick={() => setIsListDialogOpen(false)}
          />
        </div>
      </Form>
    </div>
  )
}

export default ListDialog
