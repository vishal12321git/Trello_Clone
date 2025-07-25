import useClickOutside from '@/hooks/useClickOutside'
import React, { useEffect, useRef, useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { Button, Form, Input } from 'antd'
import { createCard } from '@/services/cards'

const { TextArea } = Input

const CardDialog = ({ setIsCardDialogOpen, cards, setCards, listId }) => {
  const [isCardCreating, setIsCardCreating] = useState(false)
  const dialogRef = useRef(null)
  const inputRef = useRef(null)
  const [form] = Form.useForm()

  useClickOutside(dialogRef, () => setIsCardDialogOpen(false))

  useEffect(() => {
    inputRef.current?.focus()
  }, [])
  const handleFormSubmit = async (values) => {
    const { cardName } = values
    if (!cardName?.trim()) {
      return
    }
    setIsCardCreating(true)
    const res = await createCard(cardName.trim(), listId)
    if (res?.id) {
      setCards([...cards, res])
      form.resetFields()
      inputRef.current?.focus()
    }
    setIsCardCreating(false)
  }
  return (
    <div
      ref={dialogRef}
      className='flex-shrink-0 flex flex-col gap-3 h-fit
      rounded bg-white border-1 p-3 w-full'
    >
      <Form
        form={form}
        onFinish={handleFormSubmit}
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item
          name="cardName"
          rules={[{ required: true, message: 'Card name cannot be empty.' }]}
        >
          <TextArea
            rows={2}
            placeholder="Enter a title or paste a link"
            autoSize={{ minRows: 2, maxRows: 4 }}
            autoFocus
            ref={inputRef}
          />
        </Form.Item>
        <div className="flex gap-3 items-center">
          <Button
            type="primary"
            htmlType="submit"
            loading={isCardCreating}>
            {isCardCreating ? 'Adding Card' : 'Add card'}
          </Button>
          <RxCross2
            className="text-xl h-9 w-9 px-1 rounded text-red-500
            cursor-pointer hover:text-red-600"
            onClick={() => setIsCardDialogOpen(false)}
          />
        </div>
      </Form>
    </div>
  )
}

export default CardDialog

