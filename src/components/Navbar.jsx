import React, { useContext } from 'react'
import trelloLogo from '../assets/trello_logo.svg'
import trelloSmLogo from '../assets/trello.svg'
import { Button, Avatar, Space, Tooltip } from 'antd'
import Dialog from './Dialogs/BoardDialog'
import { AllBoardsContext } from '@/contexts/AllBoardsContext'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const { isDialogOpen, setIsDialogOpen } = useContext(AllBoardsContext)

  return (
    <div className="shadow-md backdrop-blur-md fixed w-full z-10 ">
      <div className="h-20 flex justify-between
      items-center gap-4 w-11/12 m-auto">
        <Link to='/' className='w-8 sm:w-24'>
          <img
            src={trelloLogo}
            className='object-contain w-full hidden sm:block'
            alt="Trello logo"
          />
          <img
            src={trelloSmLogo}
            className='object-contain w-full block sm:hidden'
            alt="Trello small logo"
          />
        </Link>
        <div className="relative">
          <Button
            type="primary"
            className="bg-blue-600"
            onClick={() => setIsDialogOpen((prev) => !prev)}
          >
            Create Board
          </Button>
          {isDialogOpen && <Dialog />}
        </div>
        <Space size="large" className="items-center">
          <Avatar
            size="large"
            style={{ backgroundColor: '#9254de', cursor: 'pointer' }}
          >
            VP
          </Avatar>
        </Space>
      </div>
    </div>
  )
}

export default Navbar

