import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import fetchGames from '../actions/games/fetch'
import subscribeToGames from '../actions/games/subscribe'
import CreateGameButton from './CreateGameButton'

class Lobby extends PureComponent {
  componentWillMount() {
    this.props.fetchGames()
    this.props.subscribeToGames()
  }

  render() {
    return (
      <div className="Lobby">
        <h1>Lobby!</h1>
        <CreateGameButton />
      </div>
    )
  }
}

const mapStateToProps = ({ games }) => ({ games })

export default connect(mapStateToProps, { fetchGames, subscribeToGames })(Lobby)
