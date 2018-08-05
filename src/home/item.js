import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet, PixelRatio } from 'react-native';

import Icon from 'react-native-vector-icons/dist/MaterialIcons';

export default class Item extends Component {
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
