import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import './Card.css'

class Card extends PureComponent {
  static propTypes = {
    symbol: PropTypes.string.isRequired,
    visible: PropTypes.bool,
    won: PropTypes.bool,
  }

  flip() {
    const { won, onFlip } = this.props
    if (won) return
    onFlip()
  }

  render() {
    const { visible, symbol, won } = this.props

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
