import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Animated,
  PanResponder,
  ViewPropTypes,
  PixelRatio,
} from 'react-native';

import WheelItem from './WheelItem';

const pixelSize = (function () {
  let pixelRatio = PixelRatio.get();
  if (pixelRatio >= 3) {
    return 0.3333333333333333;
  } else if (pixelRatio >= 2) {
    return 0.5;
  } else {
    return 1;
  }
})();

export default class Wheel extends Component {
  static propTypes = {
    ...ViewPropTypes,
    items: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string,
        PropTypes.number,
      ]),
    ).isRequired,
    itemStyle: Text.propTypes.style,
    holeStyle: ViewPropTypes.style, // height is required
    maskStyle: ViewPropTypes.style,
    holeLine: PropTypes.oneOfType([PropTypes.element, PropTypes.number]),
    index: PropTypes.number,
    defaultIndex: PropTypes.number,
    onChange: PropTypes.func, // (index)
  };

  static defaultProps = {
    ...View.defaultProps,
    pointerEvents: 'box-only',
    defaultIndex: 0,
  };

  static Item = WheelItem;

  static preRenderCount = 10;

  constructor(props) {
    super(props);
    this.createPanResponder();
    this.prevTouches = [];
    this.index =
      props.index || props.index === 0 ? props.index : props.defaultIndex;
    this.lastRenderIndex = this.index;
    this.height = 0;
    this.holeHeight = 0;
    this.hiddenOffset = 0;
    this.currentPosition = new Animated.Value(0);
    this.targetPositionValue = null;
  }

  componentDidMount() {
    if (!this.positionListenerId) {
      this.positionListenerId = this.currentPosition.addListener(e =>
        this.handlePositionChange(e.value),
      );
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.index || this.props.index === 0) {
      this.currentPosition.setValue(this.props.index * this.holeHeight);
    }
  }

  componentWillUnmount() {
    if (this.positionListenerId) {
      this.currentPosition.removeListener(this.positionListenerId);
      this.positionListenerId = null;
    }
  }

  createPanResponder() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState) => true,
      onStartShouldSetPanResponderCapture: (e, gestureState) => false,
      onMoveShouldSetPanResponder: (e, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (e, gestureState) => false,
      onPanResponderGrant: (e, gestureState) =>
        this.onPanResponderGrant(e, gestureState),
      onPanResponderMove: (e, gestureState) =>
        this.onPanResponderMove(e, gestureState),
      onPanResponderTerminationRequest: (e, gestureState) => true,
      onPanResponderRelease: (e, gestureState) =>
        this.onPanResponderRelease(e, gestureState),
      onPanResponderTerminate: (e, gestureState) => null,
      onShouldBlockNativeResponder: (e, gestureState) => true,
    });
  }

  onPanResponderGrant(e, gestureState) {
    this.currentPosition.stopAnimation();
    this.prevTouches = e.nativeEvent.touches;
    this.speed = 0;
  }

  onPanResponderMove(e, gestureState) {
    const {touches} = e.nativeEvent;
    const {prevTouches} = this;
    this.prevTouches = touches;

    if (
      touches.length != 1 ||
      touches[0].identifier != prevTouches[0].identifier
    ) {
      return;
    }

    const dy = touches[0].pageY - prevTouches[0].pageY;
    const pos = this.currentPosition._value - dy;
    this.currentPosition.setValue(pos);

    const t = touches[0].timestamp - prevTouches[0].timestamp;
    if (t) {
      this.speed = dy / t;
    }
  }

  onPanResponderRelease(e, gestureState) {
    this.prevTouches = [];
    if (Math.abs(this.speed) > 0.1) {
      this.handleSwipeScroll();
    } else {
      this.handleStopScroll();
    }
  }

  handlePositionChange(value) {
    const newIndex = Math.round(value / this.holeHeight);
    if (
      newIndex != this.index &&
      newIndex >= 0 &&
      newIndex < this.props.items.length
    ) {
      const moveCount = Math.abs(newIndex - this.lastRenderIndex);
      this.index = newIndex;
      if (moveCount > this.constructor.preRenderCount) {
        this.forceUpdate();
      }
    }

    // let the animation stop faster
    if (
      this.targetPositionValue != null &&
      Math.abs(this.targetPositionValue - value) <= 2
    ) {
      this.targetPositionValue = null;
      this.currentPosition.stopAnimation();
    }
  }

  handleSwipeScroll() {
    const {items} = this.props;

    const inertiaPos = this.currentPosition._value - this.speed * 300;
    let newIndex = Math.round(inertiaPos / this.holeHeight);
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex > items.length - 1) {
      newIndex = items.length - 1;
    }

    const toValue = newIndex * this.holeHeight;
    this.targetPositionValue = toValue;
    Animated.spring(this.currentPosition, {
      toValue,
      friction: 9,
      useNativeDriver: false,
    }).start(() => {
      this.currentPosition.setValue(toValue);
      this.props.onChange && this.props.onChange(newIndex);
    });
  }

  handleStopScroll() {
    const toValue = this.index * this.holeHeight;
    this.targetPositionValue = toValue;
    Animated.spring(this.currentPosition, {
      toValue,
      friction: 9,
      useNativeDriver: false,
    }).start(() => {
      this.currentPosition.setValue(toValue);
      this.props.onChange && this.props.onChange(this.index);
    });
  }

  handleLayout(height, holeHeight) {
    this.height = height;
    this.holeHeight = holeHeight;
    if (holeHeight) {
      const maskHeight = (height - holeHeight) / 2;
      this.hiddenOffset =
        Math.ceil(maskHeight / holeHeight) + this.constructor.preRenderCount;
    }
    this.forceUpdate(() => {
      this.currentPosition.setValue(this.index * holeHeight);
    });
  }

  onLayout(e) {
    this.handleLayout(e.nativeEvent.layout.height, this.holeHeight);
    this.props.onLayout && this.props.onLayout(e);
  }

  onHoleLayout(e) {
    this.handleLayout(this.height, e.nativeEvent.layout.height);
  }

  buildStyle() {
    let {style} = this.props;
    style = [
      {
        backgroundColor: '#fff',
        overflow: 'hidden',
      },
    ].concat(style);
    return style;
  }

  renderItem(item, itemIndex) {
    let {itemStyle} = this.props;

    itemStyle = [
      {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        color: '#333',
      },
    ].concat(itemStyle);

    if (Math.abs(this.index - itemIndex) > this.hiddenOffset) {
      return null;
    }
    if (typeof item === 'string' || typeof item === 'number') {
      item = <Text style={itemStyle}>{item}</Text>;
    }

    return (
      <this.constructor.Item
        itemHeight={this.holeHeight}
        wheelHeight={this.height}
        index={itemIndex}
        currentPosition={this.currentPosition}
        key={itemIndex}>
        {item}
      </this.constructor.Item>
    );
  }

  renderMask() {
    let {maskStyle} = this.props;
    maskStyle = [
      {
        backgroundColor: '#fff',
        opacity: 0.6,
        flex: 1,
        zIndex: 100,
      },
    ].concat(maskStyle);
    return <View style={maskStyle} />;
  }

  renderHole() {
    let {holeStyle} = this.props;
    holeStyle = [
      {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        height: 40,
        zIndex: 1,
      },
    ].concat(holeStyle);
    return <View style={holeStyle} onLayout={e => this.onHoleLayout(e)} />;
  }

  renderHoleLine() {
    let {holeLine} = this.props;
    if (holeLine === undefined) {
      holeLine = (
        <View style={{height: pixelSize, backgroundColor: '#E5E5E5'}} />
      );
    } else if (typeof holeLine === 'number') {
      holeLine = (
        <View style={{height: holeLine, backgroundColor: '#E5E5E5'}} />
      );
    }
    return holeLine;
  }

  render() {
    const {
      style,
      children,
      items,
      itemStyle,
      holeStyle,
      maskStyle,
      holeLine,
      index,
      defaultIndex,
      onChange,
      onLayout,
      ...others
    } = this.props;

    if (index || index === 0) {
      this.index = index;
    }
    this.lastRenderIndex = this.index;
    return (
      <View
        {...others}
        style={this.buildStyle()}
        onLayout={e => this.onLayout(e)}
        {...this.panResponder.panHandlers}>
        {items.map((item, index) => this.renderItem(item, index))}
        {this.renderMask()}
        {this.renderHoleLine()}
        {this.renderHole()}
        {this.renderHoleLine()}
        {this.renderMask()}
      </View>
    );
  }
}
