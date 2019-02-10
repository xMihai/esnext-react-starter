import React, { Component } from 'react'

import Board from './Board'
import Registration from './Registration'

const initialState = {
  players: ['', ''],
  playing: false,
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = initialState
    this.setPlayers = this.setPlayers.bind(this)
    this.reset = this.reset.bind(this)
  }

  setPlayers(players) {
    this.setState({ players, playing: true })
  }

  reset() {
    this.setState(initialState)
  }

  render() {
    const { playing, players } = this.state
    return playing ? (
      <Board {...{ players, reset: this.reset }} />
    ) : (
      <Registration {...{ setPlayers: this.setPlayers }} />
    )
  }
}

export default App
