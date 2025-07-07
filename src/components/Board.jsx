import React from 'react'


const board = ({ name, bg }) => {
  const isImage = typeof bg === 'string' && bg.startsWith('http')
  return (
    <div className='rounded-md border-1 overflow-hidden max-w-70 ' >
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
    </div>
  )
}

export default board
