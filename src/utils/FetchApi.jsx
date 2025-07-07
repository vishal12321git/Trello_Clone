/* eslint-disable max-len */
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL
const API_KEY = import.meta.env.VITE_API_KEY
const TOKEN = import.meta.env.VITE_API_TOKEN

export function fetchAllBoardsApi() {
  return `${BASE_URL}/1/members/me/boards?key=${API_KEY}&token=${TOKEN}`
}

export function createBoardApi(name) {
  return `${BASE_URL}/1/boards/?name=${name}&key=${API_KEY}&token=${TOKEN}`
}

export function fetchAllListsOfABoardApi(boardId) {
  return `${BASE_URL}/1/boards/${boardId}/lists?key=${API_KEY}&token=${TOKEN}`
}

export function getCardsOfListApi(listId) {
  return `${BASE_URL}/1/lists/${listId}/cards?key=${API_KEY}&token=${TOKEN}`
}

export function addListApi(name, boardId) {
  return `${BASE_URL}/1/lists?name=${encodeURIComponent(name)}&idBoard=${boardId}&key=${API_KEY}&token=${TOKEN}`
}

export function addCardApi(name, listId) {
  return `${BASE_URL}/1/cards?name=${encodeURIComponent(name)}&idList=${listId}&key=${API_KEY}&token=${TOKEN}`
}


export async function fetchAllBoards() {
  try {
    const apiUrl = fetchAllBoardsApi()
    const res = await axios.get(apiUrl)
    return res.data
  } catch (error) {
    console.error('Error while fetching all boards:', error)
    throw error
  }
}

export async function createBoard(name) {
  try {
    if (!name) return
    const apiUrl = createBoardApi(name)
    const res = await axios.post(apiUrl)
    return res.data
  } catch (err) {
    console.log('error while creating board', err)
    throw err
  }
}

export async function fetchAllListsOfABoard(id) {
  try {
    const apiUrl = fetchAllListsOfABoardApi(id)
    const res = await axios.get(apiUrl)
    return res.data
  } catch (error) {
    console.log('Error fetching lists:', error)
  }
}

export async function fetchCardsOfList(listId) {
  try {
    const apiUrl = getCardsOfListApi(listId)
    const res = await axios.get(apiUrl)
    return res.data
  } catch (err) {
    console.error('Error fetching cards:', err)
    throw err
  }
}

export async function createList(name, boardId) {
  try {
    const apiUrl = addListApi(name, boardId)
    console.log(apiUrl)
    const res = await axios.post(apiUrl)
    return res.data
  } catch (err) {
    console.error('Error creating list:', err)
    throw err
  }
}

export async function createCard(name, listId) {
  try {
    const apiUrl = addCardApi(name, listId)
    const res = await axios.post(apiUrl)
    return res.data
  } catch (err) {
    console.error('Error creating card:', err)
    throw err
  }
}
