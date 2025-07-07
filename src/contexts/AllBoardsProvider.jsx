import React, { useState, useEffect } from 'react'
import { fetchAllBoards } from '@/utils/FetchApi'
import { AllBoardsContext } from './AllBoardsContext'
// Create the context


// Provider component
export const AllBoardsProvider = ({ children }) => {
  const [allBoards, setAllBoards] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    const loadBoards = async () => {
      try {
        const data = await fetchAllBoards()
        setAllBoards(data)
      } catch (error) {
        console.error('Failed to fetch boards:', error)
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    loadBoards()
  }, [])

  return (
    <AllBoardsContext.Provider
      value={{
        allBoards,
        setAllBoards,
        loading,
        setLoading,
        error,
        setError,
        isDialogOpen,
        setIsDialogOpen,
      }}
    >
      {children}
    </AllBoardsContext.Provider>
  )
}
