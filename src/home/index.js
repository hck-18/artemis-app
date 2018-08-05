import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Button, Text, FlatList, Image, PixelRatio, TouchableOpacity, Platform, ActivityIndicator, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { StackNavigator } from 'react-navigation';

import ScanBarcodeModal from './scan-barcode-modal';

import Icon from 'react-native-vector-icons/dist/MaterialIcons';

class Item extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return <TouchableOpacity style={styles.itemContainer} onPress={this.props.onPress}>
      <View style={[styles.row]}>
        <Image style={styles.itemContainerImage} source={require('../resources/avena.jpg')} />
        <View>
          <Text>Avena Alpina</Text>
          <Text>Exito Calle 100</Text>
        </View>
      </View>

      <View style={[styles.row, styles.itemContainerSecondRow]}>
        <View style={[styles.row]}>
          <Icon name="location-on" size={20} color="#000" />
          <Text>2.0 km</Text>
        </View>

        <View>
          <Text>$25.000</Text>
        </View>
      </View>
    </TouchableOpacity>
  }
}

export default class Home extends Component {
  static navigationOptions = {
    title: 'Home', styles
  };

  state = {
    lat: null,
    lng: null,
    isLoading: true,
  }

  constructor(props) {
    super(props);

    this.onBarcodeRead = this.onBarcodeRead.bind(this);
    this.showBarScannerModal = this.showBarScannerModal.bind(this);
    this.onPressItem = this.onPressItem.bind(this);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((pos) => {
      console.log('Pos: ', pos);
      this.setState({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
        isLoading: false,
      })
    }, (error) => {
      console.log('Error: ', error);
      Alert.alert('Error getting your location');
    }, {
        enableHighAccuracy: Platform.OS != 'android',
        timeout: 5000,
        maximumAge: 0
      }
    );
  }

  onBarcodeRead(barcode, barcodeType) {
    console.log('Barcode: ', barcode);
  }

  showBarScannerModal() {
    this.props.navigation.navigate('ScanBarcodeModal', { onBarcodeRead: this.onBarcodeRead.bind(this) });
  }

  onPressItem(item) {
    const bundle = {
      productName: item.name,
      productId: item.id,
      establishmentId: item.establishmentId,
      lat: this.state.lat,
      lng: this.state.lng,
    };

    this.props.navigation.navigate('ProductDetails', {
      bundle
    });
  }

  render() {
    if (this.state.isLoading) {
      return <ActivityIndicator />
    }

    return <View>
      <View style={styles.container}>
        <TextInput style={styles.input} />
        <Icon name="photo-camera" size={30} color="#000" onPress={this.showBarScannerModal} />
      </View>

      {/*<View style={styles.emptyContainer}>
        <Text>Type something to start the magic...</Text>
  </View>*/}

      <FlatList
        style={styles.flatList}
        data={[{ key: '112', name: 'Product 1', id: 112, establishmentId: 1 }, { key: '113', name: 'Product 2', id: 113, establishmentId: 1 }]}
        renderItem={({ item }) => <Item item={item} onPress={() => this.onPressItem(item)} />}
      />
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'space-between'
  },
  input: {
    backgroundColor: '#fff',
    width: 300,
    borderRadius: 4,
    padding: 0,
  },
  row: {
    flexDirection: 'row',
  },
  emptyContainer: {
    flex: 1,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    borderBottomColor: '#47315a',
    borderBottomWidth: 1 / PixelRatio.get(),
  },
  itemContainerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 8,
  },
  itemContainerFirstRow: {

  },
  itemContainerSecondRow: {
    marginTop: 5,
    justifyContent: 'space-between',
  },
  flatList: {
    marginTop: 16,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
});