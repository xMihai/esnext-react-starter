import React from 'react'
import { withStateHandlers } from 'recompose'

import Board from './Board'
import Registration from './Registration'

// reusable initial state
const initialState = {
  players: ['', ''],
  playing: false,
}

// HOC adding two handlers
const withPlayState = withStateHandlers(initialState, {
  reset: () => () => initialState,
  setPlayers: () => players => ({ players, playing: true }),
})

// Presentational component
const App = ({ playing, players, reset, setPlayers }) =>
  playing ? <Board {...{ players, reset }} /> : <Registration {...{ setPlayers }} />

export default withPlayState(App)
