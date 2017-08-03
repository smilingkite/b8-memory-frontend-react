import React, { PureComponent } from 'react'
import JoinGameDialog from './JoinGameDialog'
import { connect } from 'react-redux'
import getCurrentGame from '../actions/games/get'
import fetchGames from '../actions/games/fetch'
import subscribeToGames from '../actions/games/subscribe'
// import Card from './Card'
import PlayerHand from './PlayerHand'
import './CardGame.css'
import WinnerStatus from './WinnerStatus'

class CardGame extends PureComponent {
  componentWillMount() {
    const { game, fetchGames, getCurrentGame, subscribeToGames, subscribed } = this.props
    const { gameId } = this.props.params

    if (!game) fetchGames()
    getCurrentGame(gameId)
    if (!subscribed) subscribeToGames()
  }

  render() {
    const { game, hasTurn } = this.props

    if (!game) return null

    return (
      <div className="CardGame">
        <h1>Card Game!</h1>
        <PlayerHand />

        { game.isPlayable ?
          <p className="turn">
            { hasTurn ? '☝️' : '🖐' } It is { hasTurn ? 'YOUR' : 'THEIR' } turn!
          </p> :
          <p className="waiting">
            Waiting for other players to join...
          </p> }

        <div className="board">
        <PlayerHand />
        </div>

        <WinnerStatus />
        <JoinGameDialog />
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser, currentGame, games, subscriptions }) => {
  const game = games.filter((g) => (g._id === currentGame))[0]
  const currentPlayer = game && game.players.filter((p) => (p.userId === currentUser._id))[0]

  return {
    hand1: (game),
    hand2: (game),
    game,
    hasTurn: game && game.players.map((p) => (p.userId))[game.turn] === currentUser._id,
    subscribed: subscriptions.includes('games'),
  }
}

export default connect(mapStateToProps, {
  getCurrentGame,
  fetchGames,
  subscribeToGames,
})(CardGame)
