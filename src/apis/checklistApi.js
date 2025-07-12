import { buildUrl } from '@/utils/UrlBuilder'

export const getChecklistsOfCardUrl = (cardId) =>
  buildUrl(`/1/cards/${cardId}/checklists`)

export const addChecklistUrl = (cardId, name) =>
  buildUrl(`/1/checklists`, { idCard: cardId, name: name })

export const removeChecklistUrl = (checklistId) =>
  buildUrl(`/1/checklists/${checklistId}`)
