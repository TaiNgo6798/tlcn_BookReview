import axios from 'axios'

export default (state = [], action) => {
  switch (action.type) {
    case 'setPost':
      state = action.payload
      return state

    case 'addPost':
      state = []

    default:
      return state
  }
}
