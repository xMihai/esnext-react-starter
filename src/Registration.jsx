import React, { Component, Fragment } from 'react'

const initialState = {
  players: ['', ''],
  showErrors: false,
}

const Row = ({ token, showErrors, onChange }) => (
  <div className="input-row">
    <div>{token}</div>
    <div>
      <input {...{ onChange, className: showErrors ? 'with-errors' : '' }} />
    </div>
  </div>
)

const Title = () => <h1 className="title">Name Registration</h1>

const Submit = props => <button {...{ ...props, className: 'play' }}>PLAY</button>

class Registration extends Component {
  constructor(props) {
    super(props)
    this.state = initialState
    this.submit = this.submit.bind(this)
  }

  submit() {
    const { players } = this.state
    const { setPlayers } = this.props
    if (players.every(Boolean)) {
      setPlayers(players)
    }

    this.setState({ showErrors: true })
  }

  updatePlayer(pos) {
    return ({ target: { value: newName } }) => {
      const { players } = this.state
      return this.setState({ players: players.map((existingName, i) => (i === pos ? newName : existingName)) })
    }
  }

  render() {
    const { showErrors } = this.state
    return (
      <div className="registration">
        <Title />
        <Row {...{ token: 'X', showErrors, onChange: this.updatePlayer(0) }} />
        <Row {...{ token: '0', showErrors, onChange: this.updatePlayer(1) }} />
        <Submit {...{ onClick: this.submit }} />
      </div>
    )
  }
}

export default Registration
