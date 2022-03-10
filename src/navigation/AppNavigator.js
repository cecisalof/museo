//AppNavigator:  we will define the type of navigation to internal screens app
import { createStackNavigator } from "@react-navigation/stack";
import { Component } from "react";

import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import ShopScreen from '../screens/ShopScreen';

const Stack = createStackNavigator();

class AppNavigator extends Component {
  render() {
    return (
      <Stack.Navigator initialRouteName="Splash">
        {/* name prop refers to the name of the route and component prop specifies the component to render for the route. Both are required*/}
        <Stack.Screen name="Splash" component={SplashScreen}  options={{ title: 'Splash' }} />
        <Stack.Screen name="Home" component={HomeScreen}  options={{ title: 'Overview' }} />
        <Stack.Screen name="Details" component={DetailsScreen}  options={{ title: 'Details' }} />
        <Stack.Screen name="Shop" component={ShopScreen}  options={{ title: 'Shop' }} />
      </Stack.Navigator>
    )
  }
}

export default AppNavigator;
