import React, { useEffect, useRef, useState } from 'react'
import { Form, Input, Button } from 'antd'
import { RxCross2 } from 'react-icons/rx'
import useClickOutside from '@/hooks/useClickOutside'
import { addChecklist } from '@/services/checklist'

const CheckListDialog = ({
  setIsCheckListDialogOpen,
  cardId,
  allCheckLists,
  setAllCheckLists,
}) => {
  const [isCreatingChecklist, setIsCreatingChecklist] = useState(false)
  const [form] = Form.useForm()
  const inputRef = useRef(null)
  const dialogRef = useRef(null)

  useClickOutside(dialogRef, () => setIsCheckListDialogOpen(false))
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = async (values) => {
    const { title } = values
    if (!title) return
    setIsCreatingChecklist(true)
    const res = await addChecklist(cardId, title)
    if (res?.id) {
      setAllCheckLists([...allCheckLists, res])
      setIsCheckListDialogOpen(false)
    }
    setIsCreatingChecklist(false)
  }
  return (
    <div className='w-full mt-1 border
    border-gray-200 rounded bg-white shadow-md'>
      <div className='flex justify-between items-center p-3 border-b'>
        <div className='font-semibold text-lg w-full text-center'>
          Add Checklist
        </div>
        <RxCross2
          className='text-xl cursor-pointer hover:text-red-500'
          onClick={() => setIsCheckListDialogOpen(false)}
        />
      </div>
      <div className='px-4 py-3' ref={dialogRef}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{
              required: true,
              message: 'Please enter checklist title',
            }]}
          >
            <Input
              placeholder="Enter checklist title"
              ref={inputRef}
              allowClear
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className='w-full'
              loading={isCreatingChecklist}>
              {isCreatingChecklist ? 'Adding Checklist' : 'Add Checklist'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default CheckListDialog

