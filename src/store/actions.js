import { createAction } from 'redux-actions'

export const reset = createAction('RESET')

export const setPlayers = createAction('SET_PLAYERS')

export const placeToken = createAction('PLACE_TOKEN')
