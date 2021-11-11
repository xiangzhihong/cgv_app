import React, { Component } from 'react'
import {
  StyleSheet,
  Dimensions,
} from 'react-native'

import VideoPlayer from 'react-native-video-controls'
import httpConfig from "../../../../api/httpConfig";
// import { bizstream } from '../../../../bizstream'

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

export default class VideoDemo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      full: false,
      isPaused: true,
    }
  }

  test(){

    this.setState({
      full: true,
    })
  }

  exitTest(){

    this.setState({
      full: false,
    })
  }

  onClose = () => {
    this.props.close()
  }

  render() {
    const resizeMode = this.state.full ?'stretch':'contain'
    return  <VideoPlayer
      videoStyle={this.state.full?{ transform: [{ rotate: '90deg' }], marginTop: deviceHeight/4, marginLeft: -((deviceHeight-deviceWidth)/2), width: deviceHeight, height: deviceWidth }:{}}
      style={this.state.full?{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }:{}}
      source={{ uri: httpConfig.mediaUrl+`${this.props.originalImageUrl}` }}
      resizeMode={resizeMode}
      onBack={this.onClose}
      toggleResizeModeOnFullscreen={false}
      tapAnywhereToPause
      onEnterFullscreen={this.test.bind(this)}
      onExitFullscreen={this.exitTest.bind(this)}
    />
  }
}

const styles = StyleSheet.create({
})
