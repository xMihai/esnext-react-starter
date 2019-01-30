import { Middleware } from 'redux'
import { Action } from 'redux-actions'

import * as T from './actionTypes'
import { set } from './actions'

const middleware: Middleware = store => next => (action: Action<any>) => {
  console.log(action, store.getState())

  const { timer } = store.getState()

  if ([T.STOP, T.RESET].includes(action.type)) {
    if (timer !== null) {
      clearInterval(timer)
    }
  }

  if (action.type === T.START || (action.type === T.RESET && timer !== null)) {
    next({
      ...action,
      payload: setInterval(() => {
        const { counter } = store.getState()
        store.dispatch(set(counter + 1))
      }, 1000),
    })
    return
  }

  next(action)
}

export default middleware
