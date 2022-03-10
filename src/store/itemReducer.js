import AsyncStorage from '@react-native-async-storage/async-storage';
import { SET_ITEMS } from "./itemTypes";

const initialState = {
  items: []
}

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ITEMS:
      try {
        const items = JSON.stringify(action.payload)
        AsyncStorage.setItem('@items', items)
      } catch (e) {
        // saving error
      }
      return {
        ...state,
        items: action.payload
      }
    default:
      return state;
  }
}
export default itemReducer
