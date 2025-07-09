import React, { useState } from 'react'
import { TbHttpDelete } from 'react-icons/tb'
import EditItemDialog from './EditItemDialog'
import { deleteCheckItem, updateCheckItemState } from '@/utils/FetchApi'

const CheckItem = ({ item, checklist, allItems, setAllItems }) => {
  const [isEditItemDialogOpen, setIsEditItemDialogOpen] = useState(false)
  const isChecked = item.state === 'complete'

  const handleCheckboxChange = async (e) => {
    const checked = e.target.checked
    try {
      await updateCheckItemState(checklist.idCard, item.id, checked)
      // Update the item's state in the allItems array
      setAllItems(allItems.map((i) =>
        i.id === item.id ?
          { ...i, state: checked ? 'complete' : 'incomplete' } : i,
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
