import { compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { start, stop, reset } from '../../store/actions'

import App, { Props as AppProps } from './App'

export default compose<AppProps, Props>(
  connect(
    ({ counter }: { counter: number }) => ({ counter }),
    { start, stop, reset }
  ),
  withHandlers({
    startOnClick: ({ start }) => () => start(),
    stopOnClick: ({ stop }) => () => stop(),
    resetOnClick: ({ reset }) => () => reset(),
  })
)(App)

type Props = {}
