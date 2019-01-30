import { createAction } from 'redux-actions'

import * as T from './actionTypes'

export const start = createAction(T.START)
export const stop = createAction(T.STOP)
export const reset = createAction(T.RESET)
export const set = createAction(T.SET)
