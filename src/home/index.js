import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Button, Text, FlatList, Image, PixelRatio, TouchableOpacity, Platform, ActivityIndicator, Alert } from 'react-native';

import Icon from 'react-native-vector-icons/dist/MaterialIcons';

import Item from './item';

export default class Home extends Component {
  static navigationOptions = {
    title: 'Home', styles
  };

  state = {
    lat: null,
    lng: null,
    isLoading: true,
    query: '',
    barcode: '',
    products: [],
  }

  constructor(props) {
    super(props);

    this.onBarcodeRead = this.onBarcodeRead.bind(this);
    this.showBarScannerModal = this.showBarScannerModal.bind(this);
    this.onPressItem = this.onPressItem.bind(this);
    this.onQuerySearch = this.onQuerySearch.bind(this);
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
    this.setState({
      barcode: barcode,
    }, () => {
      this.performRequest();
    });
  }

  showBarScannerModal() {
    this.props.navigation.navigate('ScanBarcodeModal', { onBarcodeRead: this.onBarcodeRead.bind(this) });
  }

  onPressItem(item) {
    console.log('Item: ', item);
    const bundle = {
      productId: item.id,
      productName: item.name,
      establishmentId: item.establishment.id,
      lat: this.state.lat,
      lng: this.state.lng,
    };

    console.log('Bundle: ', bundle);

    this.props.navigation.navigate('ProductDetails', {
      bundle
    });
  }

  fetchWrapper(url, options, timeout) {
    return new Promise((resolve, reject) => {
      fetch(url, options).then(resolve).catch(reject);

      if (timeout) {
        const e = new Error("Connection timed out");
        setTimeout(reject, timeout, e);
      }
    });
  }

  onQuerySearch(query) {
    this.setState({
      query
    }, () => {
      this.performRequest();
    });
  }

  performRequest() {
    this.setState({ isLoading: true, products: [] })

    const search = this.state.query ? `q=${this.state.query}` : `barcode=${this.state.barcode}`;
    this.fetchWrapper(`http://192.168.20.140:1337/products?lat=${this.state.lat}&lng=${this.state.lng}&${search}`, {}, 5000).then(response => response.json()).then(response => {
      console.log('Good Response: ', response);
      this.setState({
        isLoading: false,
        products: response
      });

    }).catch(err => {
      console.log('Err: ', err);
      this.setState({
        isLoading: false,
        products: []
      })
    })
  }

  render() {
    if (this.state.isLoading && !this.state.query && !this.state.barcode) {
      return <ActivityIndicator />
    }

    return <View>
      <View style={styles.container}>
        <TextInput placeholder="Type a query term" style={styles.input} value={this.state.query} onChangeText={this.onQuerySearch} />
        <Icon name="photo-camera" size={30} color="#000" onPress={this.showBarScannerModal} />
      </View>

      {!this.state.query && !this.state.barcode && <View style={styles.emptyContainer}>
        <Text>Type something to start the magic...</Text>
      </View>}

      {this.state.isLoading && (this.state.query || this.state.barcode) && <ActivityIndicator />}

      {this.state.products && this.state.products.length > 0 && <FlatList
        style={styles.flatList}
        data={this.state.products}
        keyExtractor={(item, index) => '' + item.id + item.establishment.id}
        renderItem={({ item }) => <Item item={item} onPress={() => this.onPressItem(item)} />}
      />}
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