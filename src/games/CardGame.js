import React, { PureComponent } from 'react'
import JoinGameDialog from './JoinGameDialog'
import { connect } from 'react-redux'
import getCurrentGame from '../actions/games/get'
import fetchGames from '../actions/games/fetch'
import subscribeToGames from '../actions/games/subscribe'
import Card from './Card'
import './CardGame.css'
import flipCard from '../actions/games/flip-card'
import WinnerStatus from './WinnerStatus'

class CardGame extends PureComponent {
  componentWillMount() {
    const { game, fetchGames, getCurrentGame, subscribeToGames, subscribed } = this.props
    const { gameId } = this.props.params

    if (!game) fetchGames()
    getCurrentGame(gameId)
    if (!subscribed) subscribeToGames()
  }

  flipCard(cardIndex) {
    const { game } = this.props

    return () => {
      this.props.flipCard(game._id, cardIndex)
    }
  }

  renderCard(card, index) {
    const { lastCard } = this.props.game

    return <Card
      key={index} { ...card }
      index={index}
      lastCard={lastCard}
      onFlip={this.flipCard(index).bind(this)} />
  }

  render() {
    const { game, hasTurn, pairs } = this.props

    if (!game) return null

    return (
      <div className="CardGame">
        <h1>CardGame!</h1>

        { game.isPlayable ?
          <p className="turn">
            { hasTurn ? '☝️' : '🖐' } It is { hasTurn ? 'YOUR' : 'THEIR' } turn!
          </p> :
          <p className="waiting">
            Waiting for other players to join...
          </p> }

        <p className="wonCards">{ pairs.join(', ') }</p>

        <div className="board">
          {!game.winnerId && game.cards.map(this.renderCard.bind(this))}
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
    pairs: (currentPlayer && currentPlayer.pairs) || [],
    game,
    hasTurn: game && game.players.map((p) => (p.userId))[game.turn] === currentUser._id,
    subscribed: subscriptions.includes('games'),
  }
}

export default connect(mapStateToProps, {
  getCurrentGame,
  fetchGames,
  subscribeToGames,
  flipCard,
})(CardGame)
