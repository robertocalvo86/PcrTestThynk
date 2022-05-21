import { createStore } from 'redux'

const initialState = {
  usrIden: {},
  notification: [],
  loading: false
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    /*case 'set':
      return { ...state, ...rest }*/
    case 'SET_NOTIFICATION':
      return {
        ...state,
        notification: rest.notification,
      }
    case 'SET_LOADING':
      return {
        ...state,
        loading: rest.loading,
      }
    default:
      return state
  }
}

const store = createStore(changeState)
export default store