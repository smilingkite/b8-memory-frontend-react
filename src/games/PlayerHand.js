import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import getCurrentGame from '../actions/games/get'
import fetchGames from '../actions/games/fetch'
import subscribeToGames from '../actions/games/subscribe'
import Card from './Card'

class PlayerHand extends PureComponent {
  // static propTypes = {
  //   hand: PropTypes.array.isRequired,
  //   // visible: PropTypes.bool,
  //   // won: PropTypes.bool,
  // }
  renderCard(card, index) {
    const { lastCard } = this.props.game

    return <Card
      key={index} { ...card }
      index={index}
      lastCard={lastCard}
      onFlip={this.flipCard(index).bind(this)} />
  }

  render() {

    console.log("PlayerHand is rendering")
    return (
      <h1>HAND</h1>
    )
  }
}

export default PlayerHand
