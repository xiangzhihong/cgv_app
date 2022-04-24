import {ADD_ITEM_TO_CART, REDUCE_ITEM_IN_CART, CLEAR_CART } from './cartActions'

const initialState = {
  errorMessage: '',
  cart: {},
  products: {},
  items: [],
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_ITEM_TO_CART: {
      const itemIndex = state.items.findIndex(i => i.good.id === payload.id)
      let quantity = 1
      let list = []
      if (itemIndex > -1) {
        const item = state.items[itemIndex]
        quantity = item.quantity + 1
        list = state.items.map((ele, index) => {
          if (index === itemIndex) {
            return ({
              ...ele,
              quantity,
            })
          }
          return ele
        })
      } else {
        list = [...state.items, { good: payload, quantity: 1 }]
      }
      return {
        ...state,
        items: list,
      }
    }
    case REDUCE_ITEM_IN_CART: {
      const targetItem = state.items.find(i => i.good.id === payload.id)
      let list = []
      if (targetItem.quantity <= 1) {
        state.items.forEach(i => {
          if (i.good.id !== payload.id) {
            list.push(i)
          }
        })
      } else {
        list = state.items.map(i => {
          if (i.good.id === payload.id) {
            return {
              good: i.good,
              quantity: i.quantity - 1,
            }
          }
          return i
        })
      }
      return {
        ...state,
        items: list,
      }
    }
    case CLEAR_CART: {
      return {
        ...state,
        items: [],
      }
    }
    default:
      return state
  }
}
