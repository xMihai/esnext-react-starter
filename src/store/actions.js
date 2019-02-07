export const reset = () => ({ type: 'RESET' })

export const setPlayers = players => ({
  type: 'SET_PLAYERS',
  payload: { players },
})

export const placeToken = pos => ({ type: 'PLACE_TOKEN', payload: { pos } })
