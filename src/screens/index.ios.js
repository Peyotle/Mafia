import {Navigation} from 'react-native-navigation';

import GroupSizeScreen from '../groupSize/GroupSizeScreen';
import RoleSelectionScreen from '../roleSelection/RoleSelectionScreen';
import GameplayScreen from '../gameplay/GameplayScreen';
import VictoryScreen from '../victory/VictoryScreen';
import MafiaTimer from '../timer/MafiaTimer';

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('mafia.GroupSizeScreen', () => GroupSizeScreen);
  Navigation.registerComponent('mafia.RoleSelectionScreen', () => RoleSelectionScreen);
  Navigation.registerComponent('mafia.GameplayScreen', () => GameplayScreen);
  Navigation.registerComponent('mafia.VictoryScreen', () => VictoryScreen);
  Navigation.registerComponent('mafia.MafiaTimer', () => MafiaTimer);

}
