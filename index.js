/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import Login from './src/Login';
import {name as appName} from './app.json';

// const Drawer = DrawerNavigator(
//     {
//     Home: {
//     screen: Dashboard, navigationOptions: {
//     header: null
//     }
//     }
//     }, {
//     contentComponent: CustomDrawerContentComponent,
//     drawerWidth: 270
//     }
//     );


AppRegistry.registerComponent(appName, () => Login);
