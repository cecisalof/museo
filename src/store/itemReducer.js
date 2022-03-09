import { RETRIEVE_ITEMS } from "./itemTypes";

const initialState = {
  items: [],
  potato: 'potato'
}

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case RETRIEVE_ITEMS:
      return {
        ...state,
        items: action.payload
      }
    default:
      return state;
  }
}
export default itemReducer
