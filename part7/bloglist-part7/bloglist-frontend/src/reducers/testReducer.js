const testReducer = (state = '', action) => {
  switch (action.type) {
    case 'HELLO':
      return 'Hello'
    case 'WORLD':
      return 'Hello world'
    default:
      return state
  }
}

export const printWorld = () => {
  return { type: 'WORLD' }
}

export default testReducer
