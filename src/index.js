import {
  Platform
} from 'react-native';
import {Navigation} from 'react-native-navigation';

// screen related book keeping
import {registerScreens} from './screens';
registerScreens();

Navigation.startSingleScreenApp({
 screen: {
   screen: 'mafia.GroupSizeScreen',
   title: 'Group Size',
  //  passProps: {},
   navigatorStyle: {
     drawUnderNavBar: true,
     navBarTranslucent: true,
     navBarTextColor: '#14BBCD',
     navBarButtonColor: '#14BBCD',
     statusBarTextColorScheme: 'light',
     screenBackgroundColor: '#001'
   }
 }
});
