import {
  addCheckItemUrl,
  getCheckItemsUrl,
  removeCheckItemUrl,
  updateCheckItemNameUrl,
  updateCheckItemStateUrl } from '@/apis/checkItemApi'
import axios from 'axios'

export const getCheckItems = async (checklistId) => {
  const url = getCheckItemsUrl(checklistId)
  const res = await axios.get(url)
  return res.data.checkItems
}

export const addCheckItem = async (checklistId, name) => {
  const url = addCheckItemUrl(checklistId, name)
  const res = await axios.post(url)
  return res.data
}

export const removeCheckItem = async (checklistId, checkItemId) => {
  const url = removeCheckItemUrl(checklistId, checkItemId)
  return axios.delete(url)
}

export const updateCheckItemState = async (cardId, checkItemId, isComplete) => {
  const url = updateCheckItemStateUrl(cardId, checkItemId)
  const state = isComplete ? 'complete' : 'incomplete'
  return axios.put(url, { state })
}

export const updateCheckItemName = async (cardId, checkItemId, newName) => {
  try {
    const url = updateCheckItemNameUrl(cardId, checkItemId, newName)
    const res = await axios.put(url)
    return res
  } catch (err) {
    console.error('Error updating check item name:', err)
    throw err
  }
}
