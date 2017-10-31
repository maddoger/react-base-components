import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FixedContainer from './fixed_container'

class MeasureContainer extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.func.isRequired,
  }

  state = {
    rect: {},
  }

  onChange = (rect) => {
    this.setState({ rect })
  }

  render() {
    const { children, ...rest } = this.props
    const { rect } = this.state
    return (
      <FixedContainer listenScroll={false} {...rest} onChange={this.onChange}>
        {children(rect)}
      </FixedContainer>
    )
  }
}

export default MeasureContainer
