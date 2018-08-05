import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { RNCamera } from 'react-native-camera';

export default class ScanBarcodeModal extends Component {
  state = {
    isCameraLoaded: false,
  };

  constructor(props) {
    super(props);

    this.showCamera = this.showCamera.bind(this);
  }

  showCamera() {
    this.setState({
      isCameraLoaded: true,
    })
  }

  render() {
    return <View style={styles.container}>
      {!this.state.isCameraLoaded && <ActivityIndicator style={styles.activityIndicator} />}

      <RNCamera
        style={[
          this.state.isCameraLoaded ? styles.cameraVisible : {}
        ]}
        onCameraReady={this.showCamera}
        onBarCodeRead={(data) => {
          this.props.navigation.state.params.onBarcodeRead(data.data, data.type);

          this.props.navigation.goBack();
        }} />
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activityIndicator: {
    flex: 1,
    zIndex: 999,
  },
  cameraVisible: {
    flex: 1,
  },
});