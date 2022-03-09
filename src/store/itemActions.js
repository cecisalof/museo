import { RETRIEVE_ITEMS } from "./itemTypes"

export const retrieveItems = (items) => ({
  type: RETRIEVE_ITEMS,
  payload: items
})
