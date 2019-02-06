import React, { Component, Fragment } from 'react'
import { compose, renderComponent } from 'recompose'

const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]

const initialState = { tokens: Array(9).fill(''), turn: 'X', ended: false, winner: null }

const Token = ({ token, winner, ...props }) => (
  <div {...{ ...props, disabled: winner || token !== '', className: 'token' }}>{token}</div>
)

const Status = ({ text }) => <div {...{ className: 'status' }}>{text}</div>

const Reset = props => <button {...{ ...props, className: 'reset' }}>RESET</button>

class Board extends Component {
  constructor(props) {
    super(props)
    this.state = initialState
    this.place = this.place.bind(this)
  }

  place(pos) {
    const { tokens, turn, winner } = this.state

    if (!winner && tokens[pos] === '') {
      const newTokens = tokens.map((_, i) => (i === pos ? turn : _))
      const ended = newTokens.every(token => token !== '')

      const hasWon = lines.some(com => com.every(pos => newTokens[pos] === turn))

      this.setState({ tokens: newTokens, turn: turn === 'X' ? '0' : 'X', ended, winner: hasWon ? turn : null })
    }
  }

  render() {
    const { tokens, ended, winner, turn } = this.state
    const { players, reset } = this.props

    return (
      <Fragment>
        <div className="board">
          {tokens.map((token, key) => (
            <Token {...{ key, token, winner, onClick: () => this.place(key) }} />
          ))}
        </div>
        <Status
          {...{
            text: winner
              ? `${players[Number(winner !== 'X')]} WON`
              : ended
              ? 'DRAW'
              : `${turn}: ${players[Number(turn !== 'X')]}`,
          }}
        />
        {(winner || ended) && <Reset {...{ onClick: reset }} />}
      </Fragment>
    )
  }
}

export default Board
