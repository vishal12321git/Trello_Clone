import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/Routes'
import { AllBoardsProvider } from './contexts/AllBoardsProvider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <AllBoardsProvider>
      <ToastContainer position="top-right" autoClose={3000} />
      <RouterProvider router={router}></RouterProvider>
    </AllBoardsProvider>
  )
}
export default App
