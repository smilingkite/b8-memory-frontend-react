// src/actions/games/flip-card.js

import API from '../../api'
import {
  LOAD_ERROR,
} from '../loading'

const api = new API()
export const FLIPPED_CARD = 'FLIPPED_CARD'

export default (gameId, cardIndex) => {
  return (dispatch) => {
    const backend = api.service('games')
    api.app.authenticate()
      .then(() => {
        backend.patch(gameId, { flip: cardIndex })
        .then(() => {
          dispatch({
            type: FLIPPED_CARD,
            payload: cardIndex
          })
        })
        .catch((error) => {
          dispatch({
            type: LOAD_ERROR,
            payload: error.message
          })
        })
      })
      .catch((error) => {
        dispatch({
          type: LOAD_ERROR,
          payload: error.message
        })
      })
  }
}
