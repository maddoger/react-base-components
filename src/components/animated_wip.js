import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { equals, mapObjIndexed } from 'ramda'
import now from 'performance-now'
import raf, { cancel } from 'raf'

export const spring = (targetValue, options = {}) => ({
  type: 'spring',
  targetValue,
  stiffness: 170,
  damping: 26,
  inertia: 1,
  precision: 0.01,
  ...options,
})

export const linear = (targetValue, options = {}) => ({
  type: 'linear',
  targetValue,
  precision: 0.01,
  ...options,
})


const msPerFrame = 1000 / 60
const STEPPER_RESULT = [0, 0]
const stepper = (prevValue, prevVelocity, deltaTime, options) => {
  const { type, targetValue, precision } = options

  let newValue = prevValue
  let newVelocity = prevVelocity

  if (type === 'spring') {
    const { stiffness = 170, damping = 26, inertia = 1 } = options
    const Fspring = -stiffness * (prevValue - targetValue)
    const Fdamper = -damping * prevVelocity
    const a = (Fspring + Fdamper) / inertia

    newVelocity = prevVelocity + a * deltaTime / 1000
    newValue = prevValue + newVelocity * deltaTime / 1000
  } else if (type === 'linear') {

    const { velocity = 100 } = options
    const distance = targetValue - prevValue
    newVelocity = Math.sign(distance) * velocity
    let path = newVelocity * deltaTime / 1000
    // if (Math.abs(path) > Math.abs(distance)) {
    //   path = distance
    // }
    newValue = prevValue + path
  }

  if (Math.abs(newValue) > precision && Math.abs(newValue - targetValue) < precision) {
    STEPPER_RESULT[0] = targetValue
    STEPPER_RESULT[1] = 0
  } else {
    STEPPER_RESULT[0] = newValue
    STEPPER_RESULT[1] = newVelocity
  }
  return STEPPER_RESULT
}

export class Animated extends PureComponent {
  static propTypes = {
    children: PropTypes.func.isRequired,
    defaultValues: PropTypes.object,
    values: PropTypes.object,
  }

  constructor(props, context) {
    super(props, context)
    this.animationHandle = null
    this.accumulatedTime = 0
    this.previousTime = 0
    this.state = this.defaultState(props)
  }

  componentDidMount() {
    this.previousTime = now()
    this.startAnimationIfNecessary()
  }

  componentWillReceiveProps(nextProps) {
    if (this.unreadPropValues != null) {
      this.clearUnreadPropValues(this.unreadPropValues)
    }

    this.unreadPropValues = nextProps.values

    if (this.animationHandle === null) {
      this.previousTime = now()
      this.startAnimationIfNecessary()
    }
  }

  componentWillUnmount() {
    if (this.animationHandle != null) {
      cancel(this.animationHandle)
      this.animationHandle = null
    }
  }

  // get initial state
  defaultState(props) {
    const { defaultValues, values } = props
    const currentValues = defaultValues || mapObjIndexed((value) => {
      if (typeof value === 'number') {
        return value
      }
      return value.targetValue
    }, values)
    const currentVelocity = mapObjIndexed(() => 0, currentValues)
    return {
      currentValues,
      currentVelocity,
    }
  }

  unreadPropValues = null

  clearUnreadPropValues(destValues) {
    let dirty = false
    let { currentValues, currentVelocity } = this.state
    Object.keys(destValues).forEach((key) => {
      const target = destValues[key]
      if (typeof target === 'number') {
        if (!dirty) {
          dirty = true
          currentValues = { ...currentValues }
          currentVelocity = { ...currentVelocity }
        }
        currentValues[key] = target
        currentVelocity[key] = 0
      }
    })

    if (dirty) {
      this.setState({ currentValues, currentVelocity })
    }
  }

  startAnimationIfNecessary() {
    this.animationHandle = raf((timestamp) => {
      if (this.identicalFrames > 5) {
        this.identicalFrames = 0
        this.animationHandle = null
        return
      }
      const time = timestamp || now()
      const deltaTime = time - this.previousTime
      this.previousTime = time
      this.accumulatedTime = this.accumulatedTime + deltaTime
      // more than 10 frames? prolly switched browser tab. Restart
      if (this.accumulatedTime > msPerFrame * 10) {
        this.accumulatedTime = 0
      }
      if (this.accumulatedTime === 0) {
        this.animationHandle = null
        this.startAnimationIfNecessary()
        return
      }

      const currentFrameCompletion =
        (this.accumulatedTime - Math.floor(this.accumulatedTime / msPerFrame) * msPerFrame) / msPerFrame
      const framesToCatchUp = Math.floor(this.accumulatedTime / msPerFrame)

      const { values } = this.props
      const nextValues = {}
      const nextVelocity = {}

      Object.keys(values).forEach((key) => {
        const target = values[key]
        if (typeof target === 'number') {
          nextValues[key] = target
          nextVelocity[key] = 0
        } else {
          let newValue = this.state.currentValues[key]
          let newVelocity = this.state.currentVelocity[key]

          for (let i = 0; i < framesToCatchUp; i += 1) {
            [newValue, newVelocity] = stepper(newValue, newVelocity, msPerFrame, target)
          }
          // next frame
          const [nextIdealValue, nextIdealVelocity] = stepper(newValue, newVelocity, msPerFrame, target)
          nextValues[key] = newValue + ((nextIdealValue - newValue) * currentFrameCompletion)
          nextVelocity[key] = newVelocity + ((nextIdealVelocity - newVelocity) * currentFrameCompletion)
        }
      })

      this.animationHandle = null
      this.accumulatedTime -= framesToCatchUp * msPerFrame

      if (!equals(nextValues, this.state.currentValues)) {
        this.setState({
          currentValues: nextValues,
          currentVelocity: nextVelocity,
        })
        this.identicalFrames = 0
      } else {
        this.identicalFrames = this.identicalFrames ? this.identicalFrames + 1 : 1
      }
      this.startAnimationIfNecessary()
    })
  }

  render() {
    const { children } = this.props
    const { currentValues } = this.state
    return children(currentValues)
  }
}
