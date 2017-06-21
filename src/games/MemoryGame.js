import React, { PureComponent } from 'react'
import JoinGameDialog from './JoinGameDialog'
import { connect } from 'react-redux'
import getCurrentGame from '../actions/games/get'
import fetchGames from '../actions/games/fetch'
import subscribeToGames from '../actions/games/subscribe'
import Card from './Card'
import './MemoryGame.css'
import flipCard from '../actions/games/flip-card'

class MemoryGame extends PureComponent {
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
    const { game, hasTurn, wonTheGame, lostTheGame } = this.props

    if (!game) return null

    return (
      <div className="MemoryGame">
        <h1>MemoryGame!</h1>

        <p className="turn">It is { hasTurn ? 'YOUR' : 'THEIR' } turn!</p>

        <div className="board">
          {!game.winnerId && game.cards.map(this.renderCard.bind(this))}
          {wonTheGame && <h1 className="youWin">YOU WON!</h1>}
          {lostTheGame && <h1 className="youWin">YOU LOSE!</h1>}
        </div>

        <JoinGameDialog />
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser, currentGame, games, subscriptions }) => {
  const game = games.filter((g) => (g._id === currentGame))[0]
  return {
    game,
    hasTurn: game && game.players.map((p) => (p.userId))[game.turn] === currentUser._id,
    wonTheGame: game && game.winnerId === currentUser._id,
    lostTheGame: game && game.winnerId && game.winnerId !== currentUser._id,
    subscribed: subscriptions.includes('games'),
  }
}

export default connect(mapStateToProps, {
  getCurrentGame,
  fetchGames,
  subscribeToGames,
  flipCard,
})(MemoryGame)
