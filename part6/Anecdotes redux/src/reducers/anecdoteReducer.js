import anecdoteService from '../services/anecdotes'

// Reducer
const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'ADD_VOTE': {
      const id = action.data.id
      const votedAnecdote = state.find((n) => n.id === id)
      const changedAnecdote = {
        ...votedAnecdote,
        votes: votedAnecdote.votes + 1,
      }
      const newAnecdotes = state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )
      return newAnecdotes.sort((a, b) => b.votes - a.votes)
    }
    case 'INIT_ANECDOTES': {
      return action.data.sort((a, b) => b.votes - a.votes)
    }
    case 'CREATE_ANECDOTE': {
      return state.concat(action.data)
    }
    default:
      return state
  }
}

// Action creators
export const addVote = (anecdote) => {
  return async (dispatch) => {
    const votedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    await anecdoteService.update(votedAnecdote)

    dispatch({
      type: 'ADD_VOTE',
      data: { id: anecdote.id },
    })
    console.log('Vote dispatched')
  }
}

export const initAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export default anecdoteReducer
