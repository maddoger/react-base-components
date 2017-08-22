import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import Toggle from './toggle'

class ToggleList extends PureComponent {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.any.isRequired,
      label: PropTypes.node.isRequired,
      checked: PropTypes.bool.isRequired,
      id: PropTypes.string,
      value: PropTypes.string,
      onChange: PropTypes.func,
    })).isRequired,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
    itemCheckedClassName: PropTypes.string,
    itemClassName: PropTypes.string,
    itemUncheckedClassName: PropTypes.string,
    renderItem: PropTypes.func,
    renderLabel: PropTypes.func,
  }

  renderItem = (item) => {
    const { renderLabel, itemCheckedClassName, itemUncheckedClassName, itemClassName, onChange } = this.props
    const classes = cn('toggle-list_item', itemClassName, item.className, {
      [itemCheckedClassName]: item.checked,
      [itemUncheckedClassName]: !item.checked,
    })
    const id = item.id || `layer-${item.key}`
    return (
      <li key={item.key} className={classes}>
        <label className="toggle-list_label" htmlFor={id}>
          {renderLabel ? renderLabel(item) : item.label}
        </label>
        <Toggle id={id} className="toggle-list_toggle" name={item.name} value={item.value}
          checked={item.checked} onChange={item.onChange || onChange} />
      </li>
    )
  }

  render() {
    const { className, items, renderItem } = this.props
    return (
      <div className={cn('toggle-list', className)}>
        {renderItem ? items.map(renderItem) : items.map(this.renderItem())}
      </div>
    )
  }
}

export default ToggleList
