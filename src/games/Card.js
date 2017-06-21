import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import './Card.css'

class Card extends PureComponent {
  static propTypes = {
    symbol: PropTypes.string.isRequired,
    visible: PropTypes.bool,
    won: PropTypes.bool,
  }

  state = { visible: false, won: false }

  componentDidMount() {
    const { visible, won } = this.props
    this.setState({ visible, won })
  }

  componentWillReceiveProps(nextProps) {
    const isLastCard = this.props.index === nextProps.lastCard
    const lastCardChanged = !!nextProps.lastCard && this.props.lastCard !== nextProps.lastCard
    const { visible, won } = nextProps

    if (isLastCard) {
      this.setState({ visible: true })
    }

    if (lastCardChanged) {
      this.pauseUpdate(visible, won)
    } else {
      this.setState({ visible, won })
    }
  }

  flip() {
    const { won, onFlip } = this.props
    if (won) return
    onFlip()
  }

  pauseUpdate(visible, won) {
    const component = this
    setTimeout(() => {
      component.setState({ visible, won })
    }, 1000)

  }

  render() {
    const { symbol } = this.props
    const { visible, won } = this.state

    return (
      <div className={`Card${visible ? ' flipped' : ''}${won ? ' won' : ''}`} onClick={this.flip.bind(this)}>
    		<div className="flipper">
    			<div className="front">
    				&nbsp;
    			</div>
    			<div className="back">
    				{visible ? <span className="symbol">{symbol}</span> : <span>&nbsp;</span> }
    			</div>
    		</div>
    	</div>
    )
  }
}

export default Card
