import axios from 'axios'
import { getListsUrl, createListUrl, deleteListUrl } from '@/apis/listApi'

export const fetchListsOfBoard = async (boardId) => {
  try {
    const apiUrl = getListsUrl(boardId)
    const res = await axios.get(apiUrl)
    return res.data
  } catch (error) {
    console.error('Error fetching lists:', error)
    throw error
  }
}

export const createList = async (name, boardId) => {
  try {
    const apiUrl = createListUrl(name, boardId)
    const res = await axios.post(apiUrl)
    return res.data
  } catch (error) {
    console.error('Error creating list:', error)
    throw error
  }
}

export const deleteList = async (listId) => {
  try {
    const url = deleteListUrl(listId)
    const res = await axios.put(url, { value: true })
    return res
  } catch (err) {
    console.error('Error deleting list:', err)
    throw err
  }
}

// export async function deleteList(listId) {
//   const url =
// `${BASE_URL}/1/lists/${listId}/closed?key=${API_KEY}&token=${TOKEN}`
//   return axios.put(url, { value: true })
// }
