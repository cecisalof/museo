//AppNavigator:  we will define the type of navigation to internal screens app
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Component } from "react";
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import FloorScreen from '../screens/FloorScreen';
import CollectionScreen from '../screens/CollectionScreen';
import ItemScreen from '../screens/ItemScreen';

const Drawer = createDrawerNavigator();

function DrawerMenu() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }}/>
      <Drawer.Screen name="BaseFloor" component={FloorScreen}  options={{ title: 'Planta Baja' }} />
      <Drawer.Screen name="FirstFloor" component={FloorScreen} options={{ title: 'Planta 1' }} />
      <Drawer.Screen name="SecondFloor" component={FloorScreen}  options={{ title: 'Planta 2' }} />
    </Drawer.Navigator>
  );
}
const Stack = createStackNavigator();

class AppNavigator extends Component {
  render() {
    return (
      <Stack.Navigator initialRouteName="Splash">
        {/* name prop refers to the name of the route and component prop specifies the component to render for the route. Both are required*/}
        <Stack.Screen name="DrawerMenu" component={DrawerMenu}  options={{ headerShown: true }} />
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="BaseFloor" component={FloorScreen} options={{ title: 'Planta Baja' }} />
        <Stack.Screen name="FirstFloor" component={FloorScreen} options={{ title: 'Planta 1' }} />
        <Stack.Screen name="SecondFloor" component={FloorScreen} options={{ title: 'Planta 2' }} />
        <Stack.Screen name="Collection" component={CollectionScreen}/>
        <Stack.Screen name="Item" component={ItemScreen}/>
      </Stack.Navigator>
    )
  }
}

export default AppNavigator;
