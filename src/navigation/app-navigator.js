//AppNavigator:  we will define the type of navigation to internal screens app
import {createBottomTabNavigator} from 'react-navigation-tabs';

import HomeScreen from '@/scenes/home';
import DetailsScreen from '@/scenes/details';

const TabNavigatorConfig = {
  initialRouteName: 'Home',
  header: null,
  headerMode: 'none',
};

const RouteConfigs = {
  Home:{
    screen: HomeScreen,
  },
  About:{
    screen: DetailsScreen,
  },
};

const AppNavigator = createBottomTabNavigator(RouteConfigs, TabNavigatorConfig);

export default AppNavigator;
