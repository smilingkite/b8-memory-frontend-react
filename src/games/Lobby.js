import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import fetchGames from '../actions/games/fetch'
import subscribeToGames from '../actions/games/subscribe'
import CreateGameButton from './CreateGameButton'
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

class Lobby extends PureComponent {
  componentWillMount() {
    this.props.fetchGames()
    this.props.subscribeToGames()
  }

  renderGame(game, index) {
    return (
      <MenuItem
        key={index}
        primaryText={`${game.owner.name}'s Game`} />
    )
  }

  render() {
    return (
      <div className="Lobby">
        <h1>Lobby!</h1>
        <CreateGameButton />
        <Paper>
          <Menu>
            { this.props.games.map(this.renderGame.bind(this))}
          </Menu>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = ({ games }) => ({ games })

export default connect(mapStateToProps, { fetchGames, subscribeToGames })(Lobby)
