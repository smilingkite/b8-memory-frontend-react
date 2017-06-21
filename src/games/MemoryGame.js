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
      console.log('hi')
      this.props.flipCard(game._id, cardIndex)
    }
  }

  renderCard(card, index) {
    return <Card
      key={index} { ...card }
      onFlip={this.flipCard(index).bind(this)} />
  }

  render() {
    const { game } = this.props

    return (
      <div className="MemoryGame">
        <h1>MemoryGame!</h1>

        <div className="board">
          {game && game.cards.map(this.renderCard.bind(this))}
        </div>

        <JoinGameDialog />
      </div>
    )
  }
}

const mapStateToProps = ({ currentGame, games, subscriptions }) => {
  const game = games.filter((g) => (g._id === currentGame))[0]
  return {
    game,
    subscribed: subscriptions.includes('games'),
  }
}

export default connect(mapStateToProps, {
  getCurrentGame,
  fetchGames,
  subscribeToGames,
  flipCard,
})(MemoryGame)
