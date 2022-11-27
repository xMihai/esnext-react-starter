import React from 'react'
import { Provider } from 'react-redux'
import store from 'store'

const Root = () => <Provider {...{ store }}>Hello</Provider>

export default Root
