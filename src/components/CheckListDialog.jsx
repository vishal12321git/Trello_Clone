// import useClickOutside from '@/hooks/useClickOutside'
// import { createChecklist } from '@/utils/FetchApi'
// import React, { useEffect, useRef, useState } from 'react'
// import { RxCross2 } from 'react-icons/rx'

// const CheckListDialog = ({
//   setIsCheckListDialogOpen,
//   cardId,
//   allCheckLists,
//   setAllCheckLists,
// }) => {
//   const [title, setTitle] = useState('')
//   const inputRef = useRef(null)
//   const dialogRef = useRef(null)
//   const handleSubmitForm = async (e) => {
//     e.preventDefault()
//     const res = await createChecklist(cardId, title)
//     if (res?.id) {
//       setAllCheckLists([...allCheckLists, res])
//       setIsCheckListDialogOpen(false)
//     }
//   }
//   useEffect(() => {
//     inputRef?.current.focus()
//   }, [])
//   useClickOutside(dialogRef, () => setIsCheckListDialogOpen(false))
//   return (
//     <div className=' w-full  mt-1 border-1 rounded'>
//       <div className='flex p-2 items-center'>
//         <div className='w-full text-center'>Add checklist</div>
//         <RxCross2
//           className='text-xl border-1 h-9 w-9 px-1 rounded hover:bg-gray-200'
//           onClick={() => setIsCheckListDialogOpen(false)} />
//       </div>
//       <form
//         onSubmit={handleSubmitForm}
//         className='flex-shrink-0 flex flex-col px-4 h-fit rounded'
//         ref={dialogRef}>
//         <label>Title</label>
//         <input
//           type='text'
//           className='border-1 h-10 w-full rounded'
//           onChange={(e) => setTitle(e.target.value)}
//           ref={inputRef} />
//         <button
//           className='border-1 w-15 rounded px-1 h-10 my-2 hover:bg-gray-200'
//           type='submit'>Add</button>
//       </form>
//     </div>

//   )
// }

// export default CheckListDialog

import React, { useEffect, useRef } from 'react'
import { Form, Input, Button, Divider } from 'antd'
import { RxCross2 } from 'react-icons/rx'
import useClickOutside from '@/hooks/useClickOutside'
import { createChecklist } from '@/utils/FetchApi'

const CheckListDialog = ({
  setIsCheckListDialogOpen,
  cardId,
  allCheckLists,
  setAllCheckLists,
}) => {
  const [form] = Form.useForm()
  const inputRef = useRef(null)
  const dialogRef = useRef(null)

  useClickOutside(dialogRef, () => setIsCheckListDialogOpen(false))

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = async (values) => {
    const { title } = values
    const res = await createChecklist(cardId, title)
    if (res?.id) {
      setAllCheckLists([...allCheckLists, res])
      setIsCheckListDialogOpen(false)
    }
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
            rules={[{ required: true,
              message: 'Please enter checklist title' }]}
          >
            <Input
              placeholder="Enter checklist title"
              ref={inputRef}
              allowClear
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className='w-full'>
              Add Checklist
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default CheckListDialog

