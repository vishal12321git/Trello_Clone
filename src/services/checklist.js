import {
  addChecklistUrl,
  getChecklistsOfCardUrl,
  removeChecklistUrl } from '@/apis/checklistApi'
import axios from 'axios'

export const getChecklistsOfCard = async (cardId) => {
  const url = getChecklistsOfCardUrl(cardId)
  const res = await axios.get(url)
  return res.data
}

export const addChecklist = async (cardId, name) => {
  const url = addChecklistUrl(cardId, name)
  const res = await axios.post(url)
  return res.data
}

export const removeChecklist = async (checklistId) => {
  const url = removeChecklistUrl(checklistId)
  return axios.delete(url)
}
