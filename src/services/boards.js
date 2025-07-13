import {
  createBoardUrl,
  deleteBoardUrl,
  getAllBoardsUrl } from '@/apis/boardApi'
import axios from 'axios'
import { toast } from 'react-toastify'

export const fetchAllBoards = async () => {
  try {
    const apiUrl = getAllBoardsUrl()
    const res = await axios.get(apiUrl)
    return res.data
  } catch (error) {
    toast.error('Failed to fetch boards')
    throw error
  }
}

export const createBoard = async (name, prefs = {} ) => {
  try {
    if (!name) return
    const { backgroundColor, backgroundImage } = prefs
    if (!backgroundColor && !backgroundImage) return
    const apiUrl = createBoardUrl(name, backgroundColor, backgroundImage)
    const res = await axios.post(apiUrl)
    toast.success('Board created successfully')
    return res.data
  } catch (error) {
    toast.error('Failed to create board')
    throw error
  }
}

export const deleteBoard = async (boardId) => {
  try {
    const url = deleteBoardUrl(boardId)
    const res = await axios.delete(url)
    if (res.status == 200) {
      toast.success('Board deleted successfully')
    }
  } catch (error) {
    toast.error('Failed to delete the board')
    throw error
  }
}

