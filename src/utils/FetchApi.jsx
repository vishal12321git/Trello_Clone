import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL
const API_KEY = import.meta.env.VITE_API_KEY
const TOKEN = import.meta.env.VITE_API_TOKEN

export function fetchAllBoardsApi() {
  return `${BASE_URL}/1/members/me/boards?key=${API_KEY}&token=${TOKEN}`
}
export function createBoardApi(name) {
  return `${BASE_URL}/1/boards/?name=${name}&key=${API_KEY}&token=${TOKEN}`
}

export async function fetchAllBoards() {
  try {
    const apiUrl = fetchAllBoardsApi()
    const res = await axios.get(apiUrl)
    return res.data
  } catch (error) {
    console.error('Error while fetching all boards:', error)
    throw error
  }
}

export async function createBoard(name) {
  try {
    if (!name) return
    const apiUrl = createBoardApi(name)
    const res = await axios.post(apiUrl)
    return res.data
  } catch (err) {
    console.log('error while creating board', err)
    throw err
  }
}
