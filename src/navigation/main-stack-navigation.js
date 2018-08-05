import { createStackNavigator } from 'react-navigation';

import Home from '../home';
import ProductDetails from '../product-details';

export default createStackNavigator(
  {
    Home: {
      screen: Home,
    },
    ProductDetails: {
      screen: ProductDetails,
    }
  }
);