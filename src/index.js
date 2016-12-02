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
     navBarTextColor: '#fff',
     navBarButtonColor: '#f00',
     statusBarTextColorScheme: 'light',
     screenBackgroundColor: '#001'
   }
 }
});
