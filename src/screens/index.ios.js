import {Navigation} from 'react-native-navigation';

import GroupSizeSelector from './GroupSizeSelector';
import RoleSelectionScreen from './RoleSelectionScreen';

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('mafia.GroupSizeSelector', () => GroupSizeSelector);
  Navigation.registerComponent('mafia.RoleSelectionScreen', () => RoleSelectionScreen);
}
