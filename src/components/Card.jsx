import React from 'react'

const Card = ({ card }) => {
  return (
    <div className='flex items-center border-1 min-h-10 rounded'>
      {card.name}
    </div>
  )
}

export default Card
