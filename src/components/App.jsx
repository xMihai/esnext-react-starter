import React, { Component, Fragment } from 'react'
import { compose, withStateHandlers } from 'recompose'
import { connect } from 'react-redux'

import Board from './Board'
import Registration from './Registration'
import { reset, setPlayers } from '../store/actions'
import { getApp } from '../store/selectors'

const AppPres = ({ setPlayers, playing }) =>
  playing ? <Board /> : <Registration {...{ setPlayers }} />

const NewApp = connect(
  state => getApp(state),
  { setPlayers }
)(AppPres)

export default NewApp
