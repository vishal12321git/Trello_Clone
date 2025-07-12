import { buildUrl } from '@/utils/UrlBuilder'

export const getCheckItemsUrl = (checklistId) =>
  buildUrl(`/1/checklists/${checklistId}`)

export const addCheckItemUrl = (checklistId, name) =>
  buildUrl(`/1/checklists/${checklistId}/checkItems`,
    { name: name })

export const removeCheckItemUrl = (checklistId, checkItemId) =>
  buildUrl(`/1/checklists/${checklistId}/checkItems/${checkItemId}`)

export const updateCheckItemStateUrl = (cardId, checkItemId) =>
  buildUrl(`/1/cards/${cardId}/checkItem/${checkItemId}`)

export const updateCheckItemNameUrl = (cardId, checkItemId, newName) =>
  buildUrl(`/1/cards/${cardId}/checkItem/${checkItemId}`, {
    name: newName,
  })
