import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'antd'

const Board = ({ name, bg, id }) => {
  const isImage = typeof bg === 'string' && bg.startsWith('http')

  return (
    <Link to={`/board/${id}`} className="block w-full ">
      <Card
        hoverable
        bordered={false}
        className="rounded-md overflow-hidden shadow-md"
        bodyStyle={{ padding: '12px 16px', textAlign: 'center' }}
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
  )
}

export default Board

