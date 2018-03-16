import { Platform, Dimensions, NativeModules,StatusBar } from 'react-native';
import _ from 'lodash';


import variable from './../variables/platform';

const deviceHeight = Dimensions.get('window').height;
export default (variables = variable) => {
  const theme = {
    flex: 1,
    paddingTop: StatusBar.currentHeight
  };

  return theme;
};
