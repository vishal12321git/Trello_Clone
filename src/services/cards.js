import { createCardUrl, deleteCardUrl, getCardsUrl } from '@/apis/cardApi'
import axios from 'axios'
import { toast } from 'react-toastify'

export const fetchCardsOfList = async (listId) => {
  try {
    const res = await axios.get(getCardsUrl(listId))
    return res.data
  } catch (error) {
    toast.error('Failed to fetch cards')
    throw error
  }
}

export const createCard = async (name, listId) => {
  try {
    const res = await axios.post(createCardUrl(name, listId))
    toast.success('Card created successfully')
    return res.data
  } catch (error) {
    toast.error('Failed to create cards')
    throw error
  }
}

export const deleteCard = async (cardId) => {
  try {
    const url = deleteCardUrl(cardId)
    const res = await axios.delete(url)
    toast.success('Card deleted successfully')
    return res
  } catch (err) {
    toast.error('Failed to delete cards')
    throw err
  }
}
