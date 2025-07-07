import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/Routes'
import { AllBoardsProvider } from './contexts/AllBoardsProvider'

const App = () => {
  return (
    <AllBoardsProvider>
      <RouterProvider router={router}></RouterProvider>
    </AllBoardsProvider>
  )
}
export default App
