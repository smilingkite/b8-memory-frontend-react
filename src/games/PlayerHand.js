import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import getCurrentGame from '../actions/games/get'
import fetchGames from '../actions/games/fetch'
import subscribeToGames from '../actions/games/subscribe'
import CardGame from './CardGame'
import Card from './Card'
import flipCard from '../actions/games/flip-card'
class PlayerHand extends PureComponent {
  // componentWillMount() {
  //   const { game, fetchGames, getCurrentGame, subscribeToGames, subscribed } = this.props
  //   const { gameId } = this.props.params
  //
  //   if (!game) fetchGames()
  //     getCurrentGame(gameId)
  //   if (!subscribed) subscribeToGames()
  // }
  //
  // renderHand(hand, index) {
  //   const { game } = this.props
  //   const { hand1 } = this.props.game
  //   if (!game) return null
  //   return <PlayerHand
  //   hand1 = {hand1}
  //   />
  // }
  renderCard(card, index) {

    // if (!game) return null

    return <Card
      key={index} { ...card }
      index={index}
      // lastCard={lastCard}
      // onFlip={this.flipCard(index).bind(this)}
      />
  }
  // flipCard(cardIndex) {
  //   const { game } = this.props
  //
  //   return () => {
  //     this.props.flipCard(game._id, cardIndex)
  //   }
  // }
  render() {
    const { game } = this.props
    if (!game) return null
    const { hand1 } = this.props.game
    console.log("PlayerHand is rendering")
    return (
      <div>hand
        {hand1}
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

// export default connect(mapStateToProps, {
//   flipCard,
// })(PlayerHand)

export default PlayerHand
