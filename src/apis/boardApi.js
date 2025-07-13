import { buildUrl } from '@/config/UrlBuilder'

export const getAllBoardsUrl = () => buildUrl('/1/members/me/boards')

export const createBoardUrl = ( name, backgroundColor, backgroundImage ) =>
  buildUrl( '/1/boards/', {
    name,
    ...(backgroundImage && { prefs_background_url: backgroundImage }),
    ...(backgroundColor && { prefs_background: backgroundColor }),
  })

export const deleteBoardUrl = (boardId) =>
  buildUrl(`/1/boards/${boardId}`)

