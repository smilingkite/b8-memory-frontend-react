import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import './Card.css'

class Card extends PureComponent {
  static propTypes = {
    symbol: PropTypes.string.isRequired,
    selected: PropTypes.bool,
    won: PropTypes.bool,
  }

  state = { selected: true, won: false } // selected true for now

  componentDidMount() {
    const { selected, won } = this.props
    this.setState({ selected, won })
  }

  componentWillReceiveProps(nextProps) {
    const isLastCard = this.props.index === nextProps.lastCard
    const lastCardChanged = !!nextProps.lastCard && this.props.lastCard !== nextProps.lastCard
    const { selected, won } = nextProps

    if (isLastCard) {
      this.setState({ selected: true })
    }

    if (lastCardChanged) {
      this.pauseUpdate(selected, won)
    } else {
      this.setState({ selected, won })
    }
  }

  flip() {
    const { won, onFlip } = this.props
    if (won) return
    onFlip()
  }

  pauseUpdate(selected, won) {
    const component = this
    setTimeout(() => {
      component.setState({ selected, won })
    }, 1000)

  }

  render() {
    const { symbol } = this.props
    const { selected, won } = this.state

    return (
      <div className={`Card${selected ? ' flipped' : ''}${won ? ' won' : ''}`} onClick={this.flip.bind(this)}>
    		<div className="flipper">
    			<div className="front">
    				&nbsp; 
    			</div>
    			<div className="back">
    				{selected ? <span className="symbol">{symbol}</span> : <span>&nbsp;</span> }
    			</div>
    		</div>
    	</div>
    )
  }
}

export default Card
