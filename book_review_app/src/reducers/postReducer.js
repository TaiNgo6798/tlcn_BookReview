
export default (state = [], action) => {
  switch (action.type) {
    case 'setPost':
      state = action.payload
      return state
    case 'loadMore':
      action.payload.map(v => {
        state.push(v)
      })
      state = [...state]
    default:
      return state
  }
}
