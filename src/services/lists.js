import axios from 'axios'
import { getListsUrl, createListUrl, deleteListUrl } from '@/apis/listApi'
import { toast } from 'react-toastify'

export const fetchListsOfBoard = async (boardId) => {
  try {
    const apiUrl = getListsUrl(boardId)
    const res = await axios.get(apiUrl)
    return res.data
  } catch (error) {
    toast.error('Failed to fetch lists')
    throw error
  }
}

export const createList = async (name, boardId) => {
  try {
    const apiUrl = createListUrl(name, boardId)
    const res = await axios.post(apiUrl)
    toast.success('List created successfully')
    return res.data
  } catch (error) {
    toast.error('Failed to create list')
    throw error
  }
}

export const deleteList = async (listId) => {
  try {
    const apiUrl = deleteListUrl(listId)
    const res = await axios.put(apiUrl, { value: true })
    toast.success('List deleted successfully')
    return res
  } catch (err) {
    toast.error('Failed to delete list')
    throw err
  }
}
