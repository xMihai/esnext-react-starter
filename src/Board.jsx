import React, { Fragment } from 'react'
import { compose, withProps, withStateHandlers } from 'recompose'

// winning lines
const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]

// reusable initial state
const initialState = {
  tokens: Array(9).fill(''),
  turn: 'X',
  ended: false,
  winner: null,
}

// Token component displays one cell
const Token = withProps(({ token, winner }) => ({
  disabled: winner || token !== '',
  className: 'token',
  children: token,
}))('div')

// Status displayes current player, as well as the game result
const Status = withProps({ className: 'status' })('div')

// Reset button
const Reset = withProps({ className: 'reset', children: 'RESET' })('button')

// Board Component
const Board = ({ tokens, winner, ended, placeToken, reset, status }) => (
  <Fragment>
    <div className="board">
      {tokens.map((token, pos) => (
        <Token key={pos} {...{ token, winner, onClick: () => placeToken(pos) }} />
      ))}
    </div>
    <Status>{status}</Status>

    {(winner || ended) && <Reset {...{ onClick: reset }} />}
  </Fragment>
)

export default compose(
  withStateHandlers(initialState, {
    placeToken: ({ tokens, turn, winner }) => pos => {
      if (!winner && tokens[pos] === '') {
        const newTokens = tokens.map((_, i) => (i === pos ? turn : _))
        const ended = newTokens.every(token => token !== '')

        const hasWon = lines.some(com => com.every(pos => newTokens[pos] === turn))

        return {
          tokens: newTokens,
          turn: turn === 'X' ? '0' : 'X',
          ended,
          winner: hasWon ? turn : null,
        }
      }
    },
  }),
  withProps(({ winner, players, ended, turn }) => ({
    status: winner
      ? `${players[Number(winner !== 'X')]} WON`
      : ended
      ? 'DRAW'
      : `${turn}: ${players[Number(turn !== 'X')]}`,
  }))
)(Board)
