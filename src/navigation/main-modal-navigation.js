import { createStackNavigator } from 'react-navigation';

import ScanBarcodeModal from '../home/scan-barcode-modal';
import MainStackNavigation from './main-stack-navigation';

export default createStackNavigator(
  {
    Main: {
      screen: MainStackNavigation
    },
    ScanBarcodeModal: {
      screen: ScanBarcodeModal
    }
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);