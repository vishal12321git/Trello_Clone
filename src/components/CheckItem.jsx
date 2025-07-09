import React, { useState } from 'react'
import { TbHttpDelete } from 'react-icons/tb'
import EditItemDialog from './EditItemDialog'
import { deleteCheckItem, updateCheckItemState } from '@/utils/FetchApi'

const CheckItem = ({ item, setChecked, checklist, allItems, setAllItems }) => {
  const [isChecked, setIsChecked] = useState(item.state === 'complete')
  const [isEditItemDialogOpen, setIsEditItemDialogOpen] = useState(false)

  const handleCheckboxChange = async (e) => {
    const checked = e.target.checked
    setIsChecked(checked)
    try {
      await updateCheckItemState(checklist.idCard, item.id, checked)
      setChecked((prev) => checked ? prev + 1 : prev - 1)
    } catch (error) {
      console.error('Error updating check item state:', error)
    }
  }

  const handleDelete = async () => {
    try {
      const res = await deleteCheckItem(checklist.id, item.id)
      if (res.status === 200) {
        setAllItems(allItems.filter((i) => i.id !== item.id))
        if (isChecked) setChecked((prev) => prev - 1)
      }
    } catch (err) {
      console.error('Failed to delete check item:', err)
    }
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
            onClick={() => setIsEditItemDialogOpen(true)}
            className='flex items-center justify-between w-full h-10
            rounded-lg px-3 hover:bg-gray-100'
          >
            <span>{isChecked ? <strike>{item.name}</strike> : item.name}</span>
          </div>
        )}
        <TbHttpDelete
          className='flex items-center justify-center h-9 w-9 px-1 rounded-lg
           hover:bg-red-200'
          onClick={handleDelete}
        />
      </div>
    </div>
  )
}

export default CheckItem
