import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import TabNav from './tab_nav'
import TabButton from './tab_button'
import Tab from './tab'

class Tabs extends Component {
  static propTypes = {
    className: PropTypes.string,
    navClassName: PropTypes.string,
    contentClassName: PropTypes.string,
    paneClassName: PropTypes.string,
    children: PropTypes.node.isRequired,
    defaultActiveKey: PropTypes.any,
    activeKey: PropTypes.any,
    onSelect: PropTypes.func,
    flex: PropTypes.bool,
  }

  constructor(props) {
    super(props)
    this.state = {
      activeKey: props.activeKey || props.defaultActiveKey,
    }
  }

  componentWillReceiveProps(nextProps) {
    const { activeKey } = nextProps
    if (activeKey) {
      this.setState({
        activeKey,
      })
    }
  }

  handleSelect = (key) => {
    const { onSelect } = this.props
    if (onSelect) {
      onSelect(key)
    } else {
      this.setState({
        activeKey: key,
      })
    }
  }

  render() {
    const { className, navClassName, contentClassName, paneClassName, children, flex } = this.props
    const { activeKey } = this.state

    const navItems = React.Children.map(children, item => (
      <TabButton
        eventKey={item.props.eventKey}
        onClick={this.handleSelect}
        active={item.props.eventKey === activeKey}
        {...item.props.buttonProps}
      >
        {item.props.title}
      </TabButton>
    ))

    const content = React.Children.map(children, item => (
      item.props.eventKey === activeKey ?
        <div className={cn('tabs_pane', paneClassName, item.props.className)}>{item.props.children}</div> : null
    ))

    return (
      <div className={cn('tabs', { '-flex': flex }, className)}>
        <TabNav className={cn('tabs_nav', navClassName)}>{navItems}</TabNav>
        <div className={cn('tabs_content', contentClassName)}>
          {content}
        </div>
      </div>
    )
  }
}

export {
  Tabs,
  Tab,
  TabNav,
  TabButton
}

export default Tabs

