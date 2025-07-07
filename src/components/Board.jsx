import React from 'react'
import { Link } from 'react-router-dom'


const Board = ({ name, bg, id }) => {
  const isImage = typeof bg === 'string' && bg.startsWith('http')
  // console.log('id', id)
  return (
    <Link
      to={`/board/${id}`}
      className='rounded-md border-1 overflow-hidden max-w-70 ' >
      <div className={`h-20  rounded `}>
        {isImage ? (
          <img src={bg} alt={name} className="object-cover h-full w-full" />
        ) : (
          <div
            style={{ backgroundColor: bg }}
            className="h-full w-full"
          ></div>
        )}
      </div>
      <div className='text-center py-2'>{name}</div>
    </Link>
  )
}

export default Board
