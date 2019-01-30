import React from 'react'

const App = ({ counter, startOnClick, stopOnClick, resetOnClick }: Props) => (
  <div>
    <button onClick={startOnClick}>Start</button>
    <button onClick={stopOnClick}>Stop</button>
    <button onClick={resetOnClick}>Reset</button>
    <div>
      <h1>{counter}</h1>
    </div>
  </div>
)

export interface Props {
  counter: number
  startOnClick: () => any
  stopOnClick: () => any
  resetOnClick: () => any
}

export default App
