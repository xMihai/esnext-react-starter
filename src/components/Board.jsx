import React, { Component, Fragment } from 'react'
import {
  compose,
  withProps,
  withStateHandlers,
  renderComponent,
} from 'recompose'

import { connect } from 'react-redux'
import { reset, setPlayers, placeToken } from '../store/actions'
import { getApp, getBoard, getStatus } from '../store/selectors'

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

const NewBoard = connect(
  state => ({
    ...getBoard(state),
    ...getApp(state),
    status: getStatus(state),
  }),
  { reset, placeToken }
)(BoardPres)

export default NewBoard
