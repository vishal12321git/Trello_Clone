import { createBoardUrl, getAllBoardsUrl } from '@/apis/boardApi'
import axios from 'axios'

export const fetchAllBoards = async () => {
  try {
    const apiUrl = getAllBoardsUrl()
    const res = await axios.get(apiUrl)
    return res.data
  } catch (error) {
    console.error('Error fetching boards:', error)
    throw error
  }
}

export const createBoard = async (name, prefs = {} ) => {
  try {
    if (!name) return
    const { backgroundColor, backgroundImage } = prefs
    if (!backgroundColor && !backgroundImage) return
    const apiUrl = createBoardUrl(name, backgroundColor, backgroundImage)
    console.log(apiUrl)
    const res = await axios.post(apiUrl)
    return res.data
  } catch (err) {
    console.log('error while creating board', err)
    throw err
  }
}
