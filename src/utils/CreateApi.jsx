const BASE_URL = import.meta.env.VITE_API_BASE_URL
const API_KEY = import.meta.env.VITE_API_KEY
const TOKEN = import.meta.env.VITE_API_TOKEN

export function createApi(id) {
  return `${BASE_URL}1/actions/${id}?key=${API_KEY}&token=${TOKEN}`
}
