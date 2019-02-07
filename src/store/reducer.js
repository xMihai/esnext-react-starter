export const initialState = {
  app: { players: ['', ''], playing: false },
  board: {
    tokens: Array(9).fill(''),
    turn: 'X',
    ended: false,
    winner: null,
  },
}

const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

const reducers = {
  RESET: () => initialState,
  SET_PLAYERS: (state, { payload: { players } }) => ({
    ...state,
    app: { players, playing: true },
  }),
  PLACE_TOKEN: (state, { payload: { pos } }) => {
    const { winner, ended, turn, tokens } = state.board

    if (!winner && tokens[pos] === '') {
      const newTokens = tokens.map((_, i) => (i === pos ? turn : _))
      const ended = newTokens.every(token => token !== '')

      const hasWon = lines.some(com =>
        com.every(pos => newTokens[pos] === turn)
      )

      return {
        ...state,
        board: {
          tokens: newTokens,
          turn: turn === 'X' ? '0' : 'X',
          ended,
          winner: hasWon ? turn : null,
        },
      }
    }
  },
  DEFAULT: state => state,
}

export const reducer = (state, action) => {
  console.log('reducer', state, action)
  return (reducers[action.type] || reducers.DEFAULT)(state, action)
}
