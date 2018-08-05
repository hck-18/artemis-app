import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons'

export default class ProductDetails extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('name', 'A Nested Details Screen'),
    };
  };

  render() {
    return (
      <View>
        <Image source={require('../resources/avena.jpg')} />

        <Text>Avena Alpina</Text>

        <Text>$25.000</Text>

        <View>
          <Icon name="location-on" size={20} color="#000" />
          <Text>4 km</Text>
        </View>
      </View>
    );
  }
}