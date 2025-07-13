import React, { useEffect, useState } from 'react'
import { IoMdCheckboxOutline } from 'react-icons/io'
import { Progress, Button, Typography, Space, Divider } from 'antd'
import CheckItemDialog from './Dialogs/CheckItemDialog'
import CheckItem from './CheckItem'
import { getCheckItems } from '@/services/checkItem'
import { removeChecklist } from '@/services/checklist'
import { MdDelete } from 'react-icons/md'

const { Text } = Typography
const CheckList = ({ checklist, setAllCheckLists }) => {
  const [isItemDialogOpen, setIsItemDialogOpen] = useState(false)
  const [allItems, setAllItems] = useState([])
  const [isCreatingCheckItem, setIsCreatingCheckItem] = useState(false)
  const [isChecklistDeleting, setIsChecklistDeleting] = useState(false)

  const checkedCount = allItems.filter(
    (item) => item.state === 'complete',
  ).length
  const progressPercentage =
    allItems.length === 0 ? 0 :
      Math.ceil((checkedCount / allItems.length) * 100)

  useEffect(() => {
    const loadCheckItems = async () => {
      const res = await getCheckItems(checklist.id)
      if (res) setAllItems(res)
    }
    loadCheckItems()
  }, [checklist.id])

  const handleDelete = async () => {
    setIsChecklistDeleting(true)
    const res = await removeChecklist(checklist.id)
    if (res.status === 200) {
      setAllCheckLists((prev) => prev.filter((i) => i.id !== checklist.id))
    }
    setIsChecklistDeleting(false)
  }

  return (
    <div className="flex flex-col gap-3 mb-6 p-4
    border rounded-lg bg-white shadow-sm">
      <div className="flex justify-between items-center">
        <Space align="center">
          <IoMdCheckboxOutline className="text-lg" />
          <Text strong>{checklist.name}</Text>
        </Space>
        <Button
          icon={<MdDelete />}
          loading={isChecklistDeleting}
          onClick={handleDelete}
        />
      </div>
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
          setIsCreatingCheckItem={setIsCreatingCheckItem}
          isCreatingCheckItem={isCreatingCheckItem}
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

