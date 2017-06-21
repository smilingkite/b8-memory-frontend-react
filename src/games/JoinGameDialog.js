import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import joinGame from '../actions/games/join'

class JoinGameDialog extends PureComponent {
  static propTypes = {
    open: PropTypes.bool,
  }

  joinGame = () => {
    const { joinGame, currentGame } = this.props
    joinGame(currentGame)
  }

  render() {
    const actions = [
      <Link to="/">
        <FlatButton
          label="No Thanks"
          primary={true} />
      </Link>,
      <RaisedButton
        label="Join Game"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.joinGame}
      />,
    ]

    return (
      <div>
        <Dialog
          title="Join Game"
          actions={actions}
          modal={false}
          open={this.props.open}
          onRequestClose={this.handleClose}
        >
          Hey there! Would you like to join this game?
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser, currentGame, games }) => {
  const game = games.filter((g) => (g._id === currentGame))[0]
  if(!game) return { open: false }

  const { started } = game
  const joined = game.players
    .map((p) => (p.userId))
    .includes(currentUser._id)

  return {
    open: (!started && !joined),
    currentUser,
    currentGame,
  }
}


export default connect(mapStateToProps, { joinGame })(JoinGameDialog)
