import React, { Component, Fragment } from 'react'
import {
  compose,
  withProps,
  withStateHandlers,
  renderComponent,
} from 'recompose'

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

const initialState = {
  tokens: Array(9).fill(''),
  turn: 'X',
  ended: false,
  winner: null,
}

const Token = withProps(({ token, winner }) => ({
  disabled: winner || token !== '',
  className: 'token',
  children: token,
}))('div')

const Status = withProps({ className: 'status' })('div')

const Reset = withProps({ className: 'reset', children: 'RESET' })('button')

const BoardPres = ({ tokens, winner, ended, placeToken, reset, status }) => (
  <Fragment>
    <div className="board">
      {tokens.map((token, key) => (
        <Token {...{ key, token, winner, onClick: () => placeToken(key) }} />
      ))}
    </div>
    <Status>{status}</Status>

    {(winner || ended) && <Reset {...{ onClick: reset }} />}
  </Fragment>
)

const NewBoard = compose(
  withStateHandlers(initialState, {
    placeToken: ({ tokens, turn, winner }, props) => pos => {
      if (!winner && tokens[pos] === '') {
        const newTokens = tokens.map((_, i) => (i === pos ? turn : _))
        const ended = newTokens.every(token => token !== '')

        const hasWon = lines.some(com =>
          com.every(pos => newTokens[pos] === turn)
        )

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
)(BoardPres)

export default NewBoard
