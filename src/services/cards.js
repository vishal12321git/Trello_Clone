import { createCardUrl, deleteCardUrl, getCardsUrl } from '@/apis/cardApi'
import axios from 'axios'

export const fetchCardsOfList = async (listId) => {
  try {
    const res = await axios.get(getCardsUrl(listId))
    return res.data
  } catch (error) {
    console.error('Error fetching cards:', error)
    throw error
  }
}

export const createCard = async (name, listId) => {
  try {
    const res = await axios.post(createCardUrl(name, listId))
    return res.data
  } catch (error) {
    console.error('Error creating card:', error)
    throw error
  }
}

export const deleteCard = async (cardId) => {
  try {
    const url = deleteCardUrl(cardId)
    const res = await axios.delete(url)
    return res
  } catch (err) {
    console.error('Error deleting card:', err)
    throw err
  }
}
