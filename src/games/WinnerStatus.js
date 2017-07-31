import React, { PureComponent } from 'react'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from 'react-redux'
import { Link } from 'react-router'

class WinnerStatus extends PureComponent {
  render() {
    const { wonTheGame, lostTheGame } = this.props

    if (!wonTheGame && !lostTheGame) return null

    const actions = [
      <Link to="/">
        <RaisedButton
          label="OK"
          primary={true} />
      </Link>,
    ]

    let title = wonTheGame ? '😈 YOU WON!' : '👿 YOU LOSE!'

    return (
      <div>
        <Dialog
          title={title}
          actions={actions}
          modal={false}
          open={true}
        >
          {wonTheGame && <p className="youWin">Well done!</p>}
          {lostTheGame && <p className="youLose">Don't be sad!</p>}
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser, currentGame, games, subscriptions }) => {
  const game = games.filter((g) => (g._id === currentGame))[0]
  return {
    wonTheGame: game && game.winnerId === currentUser._id,
    lostTheGame: game && game.winnerId && game.winnerId !== currentUser._id,
  }
}

export default connect(mapStateToProps)(WinnerStatus)
