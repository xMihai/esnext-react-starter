import { handleActions } from 'redux-actions'

export const initialState = {
  app: { players: ['', ''], playing: false },
  board: {
    tokens: Array(9).fill(''),
    turn: 'X',
    ended: false,
    winner: null,
  },
}

const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]

const reducers = {
  RESET: () => initialState,
  SET_PLAYERS: (state, { payload: { players } }) => ({
    ...state,
    app: { players, playing: true },
  }),
  PLACE_TOKEN: (state, { payload: { pos } }) => {
    const { turn, tokens } = state.board

    if (tokens[pos] === '') {
      const newTokens = tokens.map((_, i) => (i === pos ? turn : _))

      return {
        ...state,
        board: {
          tokens: newTokens,
          turn: turn === 'X' ? '0' : 'X',
        },
      }
    }
  },
  DEFAULT: state => state,
}

export const reducer = handleActions(reducers, initialState)
