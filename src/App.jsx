import React, { Component, Fragment } from 'react'
import { compose, withStateHandlers } from 'recompose'

import Board from './Board'
import Registration from './Registration'

const initialState = {
  players: ['', ''],
  playing: false,
}

const withPlayState = withStateHandlers(initialState, {
  reset: () => () => initialState,
  setPlayers: () => players => ({ players, playing: true }),
})

const AppPres = ({ playing, players, reset, setPlayers }) =>
  playing ? <Board {...{ players, reset }} /> : <Registration {...{ setPlayers }} />

const NewApp = withPlayState(AppPres)

export default NewApp
