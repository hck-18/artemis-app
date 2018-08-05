import React, { Component } from 'react';
import { View, Text, Image, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons'

export default class ProductDetails extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.bundle.productName
    };
  };

  state = {
    isLoading: true,
    response: null,
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

  componentDidMount() {
    const bundle = this.props.navigation.state.params.bundle;

    this.fetchWrapper(`http://192.168.20.140:1337/products/${bundle.productId}?establishmentId=${bundle.establishmentId}&lat=${bundle.lat}&lng=${bundle.lng}`, undefined, 2000).then(response => response.json())
      .then((responseJson) => {
        console.log('Response: ', responseJson);
        this.setState({ response: responseJson, isLoading: false });
      })
      .catch((error) => {
        this.setState({ isLoading: false });
        Alert.alert('Error loading data')
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading || !this.state.response) {
      return <View>
        <ActivityIndicator />
      </View>
    }

    return (
      <View>
        <Image source={'https://via.placeholder.com/50x50'} />

        <Text>{this.state.response.name}</Text>

        <Text>{this.state.response.price}</Text>

        <View>
          <Icon name="location-on" size={20} color="#000" />
          <Text>{parseInt(this.state.response.establishment.distance)} mts</Text>
        </View>
      </View>
    );
  }
}