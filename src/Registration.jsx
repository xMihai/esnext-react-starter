import React, { Component, Fragment } from 'react'

import { compose, withProps, mapProps, withHandlers, withStateHandlers } from 'recompose'

const initialState = {
  players: ['', ''],
  showErrors: false,
}

const Input = compose(
  withHandlers({
    onChange: ({ updatePlayer, token }) => ({ target: { value } }) =>
      updatePlayer({ newName: value, pos: Number(token !== 'X') }),
  }),
  withProps(({ showErrors }) => ({ className: showErrors ? 'with-errors' : '' })),
  mapProps(({ showErrors, updatePlayer, ...props }) => props)
)('input')

const Row = ({ token, showErrors, updatePlayer }) => (
  <div className="input-row">
    <div>{token}</div>
    <div>
      <Input {...{ token, showErrors, updatePlayer }} />
    </div>
  </div>
)

const Title = withProps({ className: 'title', children: 'Name Registration' })('h1')
const Submit = withProps({ className: 'play', children: 'PLAY' })('button')

const withFormState = withStateHandlers(initialState, {
  updatePlayer: ({ players }) => ({ newName, pos }) => ({
    players: players.map((existingName, i) => (i === pos ? newName : existingName)),
  }),
  submit: ({ players }, { setPlayers }) => () => {
    if (players.every(Boolean)) {
      setPlayers(players)
    }
    return { showErrors: true }
  },
})

const RegPres = ({ showErrors, updatePlayer, submit }) => (
  <div className="registration">
    <Title />
    <Row {...{ token: 'X', showErrors, updatePlayer }} />
    <Row {...{ token: '0', showErrors, updatePlayer }} />
    <Submit {...{ onClick: submit }} />
  </div>
)

const NewReg = withFormState(RegPres)

export default NewReg
