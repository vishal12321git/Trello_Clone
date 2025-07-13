import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Card, Popconfirm, message } from 'antd'
import { MdDelete } from 'react-icons/md'
import { deleteBoard } from '@/services/boards'
import { AllBoardsContext } from '@/contexts/AllBoardsContext'

const Board = ({ name, bg, id }) => {
  const { allBoards, setAllBoards } = useContext(AllBoardsContext)
  const isImage = typeof bg === 'string' && bg.startsWith('http')

  const handleDelete = async () => {
    await deleteBoard(id)
    const updatedBoards = allBoards.filter((board) => board.id !== id)
    setAllBoards(updatedBoards)
    message.success('Board deleted successfully')
  }

  return (
    <div className="relative w-full">
      <div className="absolute top-2 right-2 z-10
       text-white hover:text-red-500">
        <Popconfirm
          title="Are you sure to delete this board?"
          onConfirm={handleDelete}
          okText="Yes"
          cancelText="No"
        >
          <MdDelete className="text-2xl cursor-pointer" />
        </Popconfirm>
      </div>

      <Link to={`/board/${id}`} className="block w-full">
        <Card
          hoverable
          variant="borderless"
          className="rounded-md overflow-hidden shadow-md"
          styles={{ padding: '12px 16px', textAlign: 'center' }}
          cover={
            isImage ? (
              <img
                alt={name}
                src={bg}
                className="object-cover h-32 w-full"
              />
            ) : (
              <div
                style={{ backgroundColor: bg }}
                className="h-32 w-full"
              />
            )
          }
        >
          <div className="text-base font-medium truncate">{name}</div>
        </Card>
      </Link>
    </div>
  )
}

export default Board
