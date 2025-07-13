import { buildUrl } from '@/config/UrlBuilder'

export const getCardsUrl = (listId) => buildUrl(`/1/lists/${listId}/cards`)

export const createCardUrl = (name, listId) =>
  buildUrl('/1/cards', { name, idList: listId })

export const deleteCardUrl = (cardId) =>
  buildUrl(`/1/cards/${cardId}`)
