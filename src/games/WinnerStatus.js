import React, { PureComponent } from 'react'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from 'react-redux'
import { Link } from 'react-router'

class WinnerStatus extends PureComponent {
  render() {
    const { wonTheGame, lostTheGame, draw } = this.props

    if (!wonTheGame && !lostTheGame && !draw) return null

    const actions = [
      <Link to="/">
        <RaisedButton
          label="OK"
          primary={true} />
      </Link>,
    ]

    let title = wonTheGame ? '😈 YOU WON!' : '👿 YOU LOSE!'
    if (draw) title = '🤡 A DRAW!'

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
          {draw && <p className="youDraw">This asks for a rematch!</p>}
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
    draw: game && game.draw,
  }
}

export default connect(mapStateToProps)(WinnerStatus)
