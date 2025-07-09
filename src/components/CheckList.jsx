/* eslint-disable max-len */
import React, { useEffect, useState } from 'react'
import { IoMdCheckboxOutline } from 'react-icons/io'
import { Progress } from '@/components/ui/progress'
import CheckItemDialog from './CheckItemDialog'
import CheckItem from './CheckItem'
import { TbHttpDelete } from 'react-icons/tb'
import { fetchCheckItemsOfChecklist } from '@/utils/FetchApi'
import EditCheckListDialog from './EditCheckListDialog'


const CheckList = ({ checklist, allCheckLists, setAllCheckLists }) => {
  const [isEditCheckListDialogOpen, setIsCheckListDialogOpen] = useState(false)
  const [isItemDialogOpen, setIsItemDialogOpen] = useState(false)
  const [allItems, setAllItems] = useState([])
  const [checked, setChecked] = useState(0)
  useEffect(()=>{
    const loadCheckItems = async ()=>{
      const res = await fetchCheckItemsOfChecklist(checklist.id)
      if (res) {
        setAllItems(res)
      }
    }
    loadCheckItems()
  }, [checklist.id])

  return (
    <div className='flex flex-col gap-1'>
      <div className='flex  gap-3 h-10'>
        <div className='flex items-center w-full gap-3'>
          <IoMdCheckboxOutline className='text-xl'/>
          {isEditCheckListDialogOpen ?
            (<EditCheckListDialog
              setIsCheckListDialogOpen={setIsCheckListDialogOpen}
              checklist={checklist}
              allCheckLists={allCheckLists}
              setAllCheckLists={setAllCheckLists}/> ):

            (<div className='bg-gray-300 w-full h-full rounded flex items-center'
              onClick={()=>setIsCheckListDialogOpen((prevState)=>!prevState)}>{checklist.name}</div>)
          }

        </div>
        <TbHttpDelete className='h-full w-11 px-2 rounded-lg hover:bg-red-200'/>
      </div>
      <div className='flex items-center gap-3'>
        <div className='text-sm'>{allItems.length === 0 ? '0%' : `${Math.floor(100 * checked / allItems.length)}%`}</div>
        <Progress value={allItems.length === 0 ? 0 : Math.floor(100 * checked / allItems.length)} />
      </div>
      {allItems.map((item)=>(
        <CheckItem allItems={allItems} setAllItems={setAllItems} item={item} setChecked={setChecked} checklist={checklist}/>
      ))}
      {isItemDialogOpen ?
        <CheckItemDialog setIsItemDialogOpen={setIsItemDialogOpen} checklist={checklist} allItems={allItems} setAllItems={setAllItems}/> :
        <div className='px-2 py-1 border-1 rounded w-fit ml-8' onClick={()=>setIsItemDialogOpen((prevState)=>!prevState)}>Add an item</div>
      }
    </div>
  )
}

export default CheckList
