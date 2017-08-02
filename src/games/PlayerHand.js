import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import getCurrentGame from '../actions/games/get'
import fetchGames from '../actions/games/fetch'
import subscribeToGames from '../actions/games/subscribe'
import Card from './Card'

class PlayerHand extends PureComponent {
  componentWillMount() {
    const { game, fetchGames, getCurrentGame, subscribeToGames, subscribed } = this.props
    const { gameId } = this.props.params

    if (!game) fetchGames()
      getCurrentGame(gameId)
    if (!subscribed) subscribeToGames()
  }

  renderHand(hand, index) {
    const { game } = this.props
    const { hand1 } = this.props.game
    if (!game) return null
    return <PlayerHand
    hand1 = {hand1}
    />
  }
  renderCard(card, index) {
    const { lastCard } = this.props.game

    if (!game) return null

    return <Card
      key={index} { ...card }
      index={index}
      // lastCard={lastCard}
      // onFlip={this.flipCard(index).bind(this)}
      />
  }

  render() {
    if (!game) return null
    const { game } = this.props

    console.log("PlayerHand is rendering")
    return (
      <div>hand
        {game.hand1.map(this.renderCard.bind(this))}
      </div>
    )
  }
}

export default PlayerHand
