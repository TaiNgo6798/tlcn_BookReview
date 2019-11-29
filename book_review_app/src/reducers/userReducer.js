
export default (state = {avatar: '', firstName: 'anonymous'}, action) => {
  switch (action.type) {
  case 'setUser':
    state = action.payload
  default:
    return state
  }
}
