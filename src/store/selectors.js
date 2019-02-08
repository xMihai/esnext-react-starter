import { createSelector } from 'reselect'

const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]

export const getApp = ({ app }) => app

export const getPlayers = state => {
  const { players } = getApp(state)
  return players
}

export const getBoard = ({ board }) => board

export const getTokens = state => {
  const { tokens } = getBoard(state)
  return tokens
}

export const hasEnded = createSelector(
  [getTokens],
  tokens => tokens.every(token => token !== '')
)

const getTurn = state => {
  const { turn } = getBoard(state)
  return turn
}

const getOppositeToken = state => {
  const currentToken = getTurn(state)
  return currentToken === 'X' ? '0' : 'X'
}

export const hasWon = createSelector(
  [getTokens, getOppositeToken],
  (tokens, turn) => lines.some(com => com.every(pos => tokens[pos] === turn))
)

export const getWinner = state => {
  const won = hasWon(state)
  const turn = getOppositeToken(state)
  return won ? turn : null
}

export const getStatus = createSelector(
  [getWinner, getPlayers, hasEnded, getOppositeToken],
  (winner, players, ended, opponent) =>
    winner
      ? `${players[Number(winner !== 'X')]} WON`
      : ended
      ? 'DRAW'
      : `${opponent}: ${players[Number(opponent !== 'X')]}`
)
