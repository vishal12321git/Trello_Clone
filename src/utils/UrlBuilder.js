const BASE_URL = import.meta.env.VITE_API_BASE_URL
const API_KEY = import.meta.env.VITE_API_KEY
const TOKEN = import.meta.env.VITE_API_TOKEN

const authParams = {
  key: API_KEY,
  token: TOKEN,
}
export function buildUrl(path, params={}) {
  const baseParams = {
    ...authParams,
    ...params,
  }
  const query = new URLSearchParams(baseParams).toString()
  return `${BASE_URL}${path}?${query}`
}
