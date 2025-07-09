/* eslint-disable max-len */
import React, { useState } from 'react'
import { TbHttpDelete } from 'react-icons/tb'
import EditItemDialog from './EditItemDialog'

const CheckItem = ({ item, setChecked, checklist, allItems, setAllItems }) => {
  const [isChecked, setIsChecked] = useState(false)
  const [isEditItemDialogOpen, setIsEditItemDialogOpen] = useState(false)
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked)
    setChecked((prev) => e.target.checked ? prev + 1 : prev - 1)
  }

  return (
    <div className='flex items-center'>
      <input
        type="checkbox"
        className='border-1'
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <div className='flex items-start w-full ml-4 rounded-lg'>
        {
          isEditItemDialogOpen ? (
            <EditItemDialog setIsEditItemDialogOpen={setIsEditItemDialogOpen} item={item} checklist={checklist}
              allItems={allItems} setAllItems={setAllItems} />
          ) : (
            <div
              onClick={() => setIsEditItemDialogOpen(true)}
              className='flex items-center justify-between w-full h-10 rounded-lg px-1 hover:bg-gray-100'
            >
              <span>{isChecked ? <strike>{item.name}</strike> : item.name}</span>
              <TbHttpDelete className='h-full w-9 px-1 rounded-lg hover:bg-red-200' />
            </div>
          )
        }
      </div>
    </div>
  )
}

export default CheckItem
