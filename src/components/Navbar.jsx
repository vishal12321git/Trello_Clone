/* eslint-disable max-len */
import React, { useContext } from 'react'
import trelloLogo from '../assets/trello_logo.svg'
import trelloSmLogo from '../assets/trello.svg'
import { Input } from '@/components/ui/input'
import { MdContactSupport } from 'react-icons/md'
import { IoIosSearch } from 'react-icons/io'
import Dialog from './Dialog'
import { AllBoardsContext } from '@/contexts/AllBoardsContext'
import { Link } from 'react-router-dom'


const Navbar = () => {
  const { isDialogOpen, setIsDialogOpen } = useContext(AllBoardsContext)

  return (
    <div className='shadow'>
      <div className='h-20 flex justify-between items-center gap-4 w-11/12 m-auto'>
        <Link to='/' className='w-8 sm:w-20'>
          <img src={trelloLogo} className='object-contain w-full hidden sm:block' />
          <img src={trelloSmLogo} className='object-contain w-full block sm:hidden' />
        </Link>
        <div className='flex items-center justify-center gap-4'>
          <IoIosSearch className='h-full w-8 block sm:hidden' />
          <Input type="email" placeholder="🔍 Search" className={'hidden sm:block w-80 lg:w-150'} />
          <div className='relative '>
            <div className='px-2 py-1 border-1 rounded' onClick={() => setIsDialogOpen((prevState) => !prevState)}>Create</div>
            {isDialogOpen && <Dialog/>}
          </div>

        </div>
        <div className='flex items-center gap-4'>
          <MdContactSupport className='h-6 w-6 md:h-8 md:w-8' />
          <div className='rounded-full bg-purple-400 text-white h-8 w-8 md:h-10 md:w-10 flex justify-center items-center'>VP</div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
