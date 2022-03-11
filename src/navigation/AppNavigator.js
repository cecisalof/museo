//AppNavigator:  we will define the type of navigation to internal screens app
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Component } from "react";
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import BaseFloorScreen from '../screens/BaseFloorScreen';
import FirstFloorScreen from '../screens/FirstFloorScreen';
import SecondFloorScreen from '../screens/SecondFloorScreen';

const Stack = createStackNavigator();

class AppNavigator extends Component {
  render() {
    return (
      <Stack.Navigator initialRouteName="Splash">
        {/* name prop refers to the name of the route and component prop specifies the component to render for the route. Both are required*/}
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="BaseFloor" component={BaseFloorScreen} options={{ title: 'Planta Baja' }} />
        <Stack.Screen name="FirstFloor" component={FirstFloorScreen} options={{ title: 'Planta 1' }} />
        <Stack.Screen name="SecondFloor" component={SecondFloorScreen} options={{ title: 'Planta 2' }} />
      </Stack.Navigator>
    )
  }
}

export default AppNavigator;
