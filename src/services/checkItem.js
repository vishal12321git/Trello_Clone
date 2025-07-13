import {
  addCheckItemUrl,
  getCheckItemsUrl,
  removeCheckItemUrl,
  updateCheckItemNameUrl,
  updateCheckItemStateUrl } from '@/apis/checkItemApi'
import axios from 'axios'
import { toast } from 'react-toastify'

export const getCheckItems = async (checklistId) => {
  try {
    const url = getCheckItemsUrl(checklistId)
    const res = await axios.get(url)
    return res.data.checkItems
  } catch (error) {
    toast.error('Failed to fetch CheckItems')
    throw error
  }
}

export const addCheckItem = async (checklistId, name) => {
  try {
    const url = addCheckItemUrl(checklistId, name)
    const res = await axios.post(url)
    toast.success('CheckItem created successfully')
    return res.data
  } catch (error) {
    toast.error('Failed to create CheckItem')
    throw error
  }
}

export const removeCheckItem = async (checklistId, checkItemId) => {
  try {
    const url = removeCheckItemUrl(checklistId, checkItemId)
    toast.success('CheckItem deleted successfully')
    return axios.delete(url)
  } catch (error) {
    toast.error('Failed to delete CheckItem')
    throw error
  }
}

export const updateCheckItemState = async (cardId, checkItemId, isComplete) => {
  try {
    const url = updateCheckItemStateUrl(cardId, checkItemId)
    const state = isComplete ? 'complete' : 'incomplete'
    return axios.put(url, { state })
  } catch (error) {
    toast.error('Failed to update state of CheckItem')
    throw error
  }
}

export const updateCheckItemName = async (cardId, checkItemId, newName) => {
  try {
    const url = updateCheckItemNameUrl(cardId, checkItemId, newName)
    const res = await axios.put(url)
    toast.success('Name updated successfully')
    return res
  } catch (error) {
    toast.error('Failed to update name of CheckItem')
    throw error
  }
}
