//AppNavigator:  we will define the type of navigation to internal screens app
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Component } from "react";
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import BaseFloorScreen from '../screens/BaseFloorScreen';
import FirstFloorScreen from '../screens/FirstFloorScreen';
import SecondFloorScreen from '../screens/SecondFloorScreen';
import DrawerMenu from '../navigation/DrawerNavigator';

const Stack = createStackNavigator();

class AppNavigator extends Component {
  render() {
    return (
      <Stack.Navigator initialRouteName="Drawer"
        options= {{
        headerStyle: {
        backgroundColor: "#000",
          }
        }}>
        {/* name prop refers to the name of the route and component prop specifies the component to render for the route. Both are required*/}
        <Stack.Screen name="Menú" component={DrawerMenu} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="BaseFloor" component={BaseFloorScreen} options={{ headerShown: false }} />
        <Stack.Screen name="FirstFloor" component={FirstFloorScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SecondFloor" component={SecondFloorScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    )
  }
}

export default AppNavigator;
