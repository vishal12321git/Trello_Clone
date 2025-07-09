import React, { useEffect, useState } from 'react'
import { FaCheck } from 'react-icons/fa'
import { RxCross2 } from 'react-icons/rx'
import { FiCheckSquare } from 'react-icons/fi'
import CheckListDialog from './CheckListDialog'
import CheckList from './CheckList'
import { fetchChecklistsOfCard } from '@/utils/FetchApi'

const CardModal = ({ list, card, isOpen, onClose, checked, setChecked }) => {
  const [isCheckListDialogOpen, setIsCheckListDialogOpen] = useState(false)
  const [allCheckLists, setAllCheckLists] = useState([])

  useEffect(() => {
    const loadCheckLists = async () => {
      const res = await fetchChecklistsOfCard(card.id)
      setAllCheckLists(res)
    }
    loadCheckLists()
  }, [card.id])
  if (!isOpen) return null
  return (
    <div
      className="fixed inset-0 z-50 flex py-10
    justify-center bg-black/40 backdrop-blur-sm">
      <div
        className="bg-white rounded-lg p-6 w-[60%]
      max-w-3xl shadow-lg relative overflow-y-scroll">
        <div className='flex justify-between h-10'>
          <div>{list.name}</div>
          <div>
            <RxCross2 onClick={onClose} className='text-2xl' />
          </div>
        </div>
        <hr />
        <div className='flex flex-col gap-8 mt-4'>
          <div>
            <div className='flex items-center'>
              <div
                className={`w-5 h-5 rounded-full flex items-center 
                  justify-center border transition-opacity duration-300 mr-2
                   border-black opacity-100
                          ${checked ? 'bg-green-600' : 'bg-white'}
                        `}
                onClick={(e) => {
                  e.stopPropagation()
                  setChecked(!checked)
                }}>
                {checked && <FaCheck className="text-white text-xs" />}
              </div>
              <textarea
                rows={1}
                className='border-1 w-full rounded resize-none p-2'
                value={card.name}
                disabled
              />
            </div>
            <div
              className='flex border-1 w-fit items-center gap-2 px-1 py-1
            rounded ml-7 mt-3 cursor-pointer'
              onClick={() => setIsCheckListDialogOpen(
                (prevState) => !prevState)}>
              <FiCheckSquare />
              <span className='text-sm'>Checklist</span>
            </div>
            {isCheckListDialogOpen && <CheckListDialog
              setIsCheckListDialogOpen={setIsCheckListDialogOpen}
              cardId={card.id}
              setAllCheckLists={setAllCheckLists}
              allCheckLists={allCheckLists} />}
          </div>
          {allCheckLists.map((checklist) => (<CheckList
            allCheckLists={allCheckLists}
            setAllCheckLists={setAllCheckLists}
            checklist={checklist}
            key={checklist.id}
            id={checklist.id} />))}
        </div>
      </div>
    </div>
  )
}

export default CardModal
