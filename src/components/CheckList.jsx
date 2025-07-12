import React, { useEffect, useState } from 'react'
import { IoMdCheckboxOutline } from 'react-icons/io'
import { Progress, Button, Tooltip, Typography, Space, Divider } from 'antd'
import { TbHttpDelete } from 'react-icons/tb'
import CheckItemDialog from './CheckItemDialog'
import CheckItem from './CheckItem'
import { getCheckItems } from '@/services/checkItem'
import { removeChecklist } from '@/services/checklist'

const { Text } = Typography

const CheckList = ({ checklist, allCheckLists, setAllCheckLists }) => {
  const [isItemDialogOpen, setIsItemDialogOpen] = useState(false)
  const [allItems, setAllItems] = useState([])

  const checkedCount = allItems.filter(
    (item) => item.state === 'complete',
  ).length
  const progressPercentage =
    allItems.length === 0 ? 0 :
      Math.floor((checkedCount / allItems.length) * 100)

  useEffect(() => {
    const loadCheckItems = async () => {
      const res = await getCheckItems(checklist.id)
      if (res) setAllItems(res)
    }
    loadCheckItems()
  }, [checklist.id])

  const handleDelete = async () => {
    try {
      const res = await removeChecklist(checklist.id)
      if (res.status === 200) {
        setAllCheckLists(allCheckLists.filter((i) => i.id !== checklist.id))
      }
    } catch (err) {
      console.error('Failed to delete checklist:', err)
    }
  }

  return (
    <div className="flex flex-col gap-3 mb-6 p-4
    border rounded-lg bg-white shadow-sm">

      <div className="flex justify-between items-center">
        <Space align="center">
          <IoMdCheckboxOutline className="text-lg" />
          <Text strong>{checklist.name}</Text>
        </Space>
        <TbHttpDelete
          className="text-xl text-red-500 cursor-pointer hover:text-red-600"
          onClick={handleDelete}
        />
      </div>

      {/* Progress Bar */}
      <div className="flex items-center gap-3">
        <Text type="secondary" className="min-w-[30px]">
          {progressPercentage}%
        </Text>
        <Progress
          percent={progressPercentage}
          size="small"
          showInfo={false}
          style={{ flex: 1 }}
        />
      </div>

      {allItems.map((item) => (
        <CheckItem
          key={item.id}
          item={item}
          allItems={allItems}
          setAllItems={setAllItems}
          checklist={checklist}
        />
      ))}

      {isItemDialogOpen ? (
        <CheckItemDialog
          setIsItemDialogOpen={setIsItemDialogOpen}
          checklist={checklist}
          allItems={allItems}
          setAllItems={setAllItems}
        />
      ) : (
        <Button
          type="dashed"
          className="ml-6 w-fit"
          onClick={() => setIsItemDialogOpen(true)}
        >
          Add an Item
        </Button>
      )}
    </div>
  )
}

export default CheckList

