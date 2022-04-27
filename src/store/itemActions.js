import { SET_ITEMS, SET_SEARCH_TERM } from "./itemTypes"

export const setItems = (items) => ({
  type: SET_ITEMS,
  payload: items
})

export const setSearchTerm = (searchTerm) => ({
  type: SET_SEARCH_TERM,
  payload: searchTerm
})
