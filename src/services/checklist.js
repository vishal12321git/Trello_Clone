import {
  addChecklistUrl,
  getChecklistsOfCardUrl,
  removeChecklistUrl } from '@/apis/checklistApi'
import axios from 'axios'
import { toast } from 'react-toastify'

export const getChecklistsOfCard = async (cardId) => {
  try {
    const url = getChecklistsOfCardUrl(cardId)
    const res = await axios.get(url)
    return res.data
  } catch (error) {
    toast.error('Failed to fetch checklists')
    throw error
  }
}

export const addChecklist = async (cardId, name) => {
  try {
    const url = addChecklistUrl(cardId, name)
    const res = await axios.post(url)
    toast.success('Checklist created successfully')
    return res.data
  } catch (error) {
    toast.error('Failed to add checklist')
    throw error
  }
}

export const removeChecklist = async (checklistId) => {
  try {
    const url = removeChecklistUrl(checklistId)
    toast.success('Checklist deleted successfully')
    return axios.delete(url)
  } catch (error) {
    toast.error('Failed to delete checklist')
    throw error
  }
}
