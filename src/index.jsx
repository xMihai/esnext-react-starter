import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom'

const mount = props => (Component, key) => <Component {...{ ...props, key }} />

const TurnButton = props => <button {...{ ...props, className: 'button' }} />

const ResetButton = props => <button {...{ ...props, className: 'button' }}>RESET</button>

const Token = props => <div {...{ ...props, className: 'token' }}>|</div>

const Outcome = ({ winner, ...props }) => (
  <h1 {...{ ...props, className: 'outcome' }}>{winner && `Player ${winner} wins!`}&nbsp;</h1>
)

const Row = ({ tokens, remove, ...rest }) => (
  <div {...{ ...rest, className: 'row' }}>
    {Array(tokens)
      .fill(Token)
      .map(mount({ onClick: remove }))}
  </div>
)

const initialState = { tokens: [1, 3, 5, 7], turn: 'A', row: null, ended: false }

class Board extends Component {
  constructor(props) {
    super(props)
    this.state = initialState
    this.remove = this.remove.bind(this)
    this.reset = this.reset.bind(this)
    this.switchTurn = this.switchTurn.bind(this)
  }

  reset() {
    this.setState(initialState)
  }

  remove(fromRow) {
    return () => {
      const { tokens, row, turn } = this.state
      if (row === fromRow || row == null) {
        const newTokens = tokens.map((rowTokens, i) => (i === fromRow ? rowTokens - 1 : rowTokens))
        if (newTokens.some(x => x > 0))
          this.setState({
            tokens: newTokens,
            row: fromRow,
          })
      }
    }
  }

  switchTurn() {
    const { turn, tokens } = this.state
    const ended = tokens.reduce((total, x) => total + x, 0) === 1
    this.setState({ ...(ended ? {} : { turn: turn === 'A' ? 'B' : 'A' }), row: null, ended })
  }

  render() {
    const { tokens, turn, row, ended } = this.state
    return (
      <Fragment>
        <Outcome {...{ winner: ended ? turn : null }} />
        {tokens.map((rowTokens, key) => (
          <Row {...{ key, tokens: rowTokens, disabled: row !== null && row !== key, remove: this.remove(key) }} />
        ))}
        {ended ? (
          <ResetButton {...{ onClick: this.reset }} />
        ) : (
          <TurnButton {...{ onClick: this.switchTurn }}>{turn}</TurnButton>
        )}
      </Fragment>
    )
  }
}

ReactDOM.render(<Board />, document.getElementById('index'))
