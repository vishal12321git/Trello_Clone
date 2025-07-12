import { buildUrl } from '@/utils/UrlBuilder'

export const getListsUrl = (boardId) => buildUrl(`/1/boards/${boardId}/lists`)

export const createListUrl = (name, boardId) =>
  buildUrl('/1/lists', { name: name, idBoard: boardId })

export const deleteListUrl = (listId) =>
  buildUrl(`/1/lists/${listId}/closed`)
