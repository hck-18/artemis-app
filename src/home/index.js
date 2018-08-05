import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';

import Icon from 'react-native-vector-icons/dist/MaterialIcons';

export default class Home extends Component {
  static navigationOptions = {
    title: 'Home',
  };

  render() {
    return <View>
      <View style={style.container}>
        <TextInput style={style.input} />
        <Icon name="photo-camera" size={30} color="#000" />
      </View>

      <View style={style.emptyContainer}>
        <Text>Type something to start the magic...</Text>
      </View>
    </View>
  }
}

const style = StyleSheet.create({
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
  emptyContainer: {
    flex: 1,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center'
  }
});