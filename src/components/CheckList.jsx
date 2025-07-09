import React, { useEffect, useState } from 'react'
import { IoMdCheckboxOutline } from 'react-icons/io'
import { Progress } from '@/components/ui/progress'
import CheckItemDialog from './CheckItemDialog'
import CheckItem from './CheckItem'
import { TbHttpDelete } from 'react-icons/tb'
import { deleteChecklist, fetchCheckItemsOfChecklist } from '@/utils/FetchApi'

const CheckList = ({ checklist, allCheckLists, setAllCheckLists }) => {
  const [isItemDialogOpen, setIsItemDialogOpen] = useState(false)
  const [allItems, setAllItems] = useState([])

  // Calculate checked count based on current allItems
  const checkedCount = allItems.filter(
    (item) => item.state === 'complete',
  ).length
  const progressPercentage = allItems.length === 0 ?
    0 :
    Math.floor(100 * checkedCount / allItems.length)

  useEffect(() => {
    const loadCheckItems = async () => {
      const res = await fetchCheckItemsOfChecklist(checklist.id)
      if (res) {
        setAllItems(res)
      }
    }
    loadCheckItems()
  }, [checklist.id])

  const handleDelete = async () => {
    try {
      const res = await deleteChecklist(checklist.id)
      if (res.status === 200) {
        const updatedChecklists = allCheckLists.filter(
          (i) => i.id != checklist.id,
        )
        setAllCheckLists(updatedChecklists)
      }
    } catch (err) {
      console.error('Failed to delete check item:', err)
    }
  }

  return (
    <div className='flex flex-col gap-1'>
      <div className='flex gap-3 h-10'>
        <div className='flex items-center w-full gap-3'>
          <IoMdCheckboxOutline className='text-xl' />
          <div className='w-full h-full rounded flex items-center'>
            {checklist.name}
          </div>
        </div>
        <TbHttpDelete
          className='h-full w-11 px-2 rounded-lg hover:bg-red-200'
          onClick={handleDelete} />
      </div>
      <div className='flex items-center gap-3'>
        <div
          className='text-sm'>
          {allItems.length === 0 ? '0%' : `${progressPercentage}%`}
        </div>
        <Progress value={progressPercentage} />
      </div>
      {allItems.map((item) => (
        <CheckItem
          key={item.id}
          allItems={allItems}
          setAllItems={setAllItems}
          item={item}
          checklist={checklist}
        />
      ))}
      {isItemDialogOpen ?
        <CheckItemDialog
          setIsItemDialogOpen={setIsItemDialogOpen}
          checklist={checklist} allItems={allItems}
          setAllItems={setAllItems} /> :
        <div
          className='px-2 py-1 border-1 rounded w-fit ml-8
           hover:bg-gray-200 cursor-pointer'
          onClick={() => setIsItemDialogOpen((prevState) => !prevState)}
        >Add an item</div>
      }
    </div>
  )
}

export default CheckList
