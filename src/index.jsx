import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom'
import { compose } from 'recompose'

const winning = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]

const Token = ({ token, ...props }) => <div {...{ ...props, className: 'token' }}>{token}</div>

const Status = ({ text }) => <div>{text}</div>

class Board extends Component {
  constructor(props) {
    super(props)
    this.state = { tokens: Array(9).fill(''), turn: 'X', ended: false, winner: null }
    this.place = this.place.bind(this)
  }

  place(pos) {
    const { tokens, turn } = this.state

    if (tokens[pos] === '') {
      const newTokens = tokens.map((_, i) => (i === pos ? turn : _))
      const ended = newTokens.every(token => token !== '')

      const hasWon = winning.some(com => com.every(pos => newTokens[pos] === turn))

      this.setState({ tokens: newTokens, turn: turn === 'X' ? '0' : 'X', ended, winner: hasWon ? turn : null })
    }
  }

  render() {
    const { tokens, ended, winner } = this.state
    return (
      <Fragment>
        <div className="board">
          {tokens.map((token, key) => (
            <Token {...{ key, token, onClick: () => this.place(key) }} />
          ))}
        </div>
        <Status {...{ text: winner ? `${winner} WON` : ended ? 'ENDED' : '' }} />
      </Fragment>
    )
  }
}

ReactDOM.render(<Board />, document.getElementById('index'))
