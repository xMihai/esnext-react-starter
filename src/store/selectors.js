export const getApp = ({ app }) => app

export const getBoard = ({ board }) => board

export const getStatus = state => {
  const { winner, ended, turn } = getBoard(state)
  const { players } = getApp(state)

  return winner
    ? `${players[Number(winner !== 'X')]} WON`
    : ended
    ? 'DRAW'
    : `${turn}: ${players[Number(turn !== 'X')]}`
}
