//AppNavigator:  we will define the type of navigation to internal screens app
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Component } from "react";
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import FloorScreen from '../screens/FloorScreen';
import CollectionScreen from '../screens/CollectionScreen';
import ItemScreen from '../screens/ItemScreen';
import DrawerMenu from '../navigation/DrawerNavigator';
import logo from '../assets/images/logo.png'
import {
  Image,
  StyleSheet,
  Platform,
  SafeAreaView
} from "react-native";
import { Color } from '../assets/styles/index.js';

const Stack = createStackNavigator();

function Logo() {
  return (
    <Image
      source={logo}
      style={styles.logo}
    />
  );
}

class AppNavigator extends Component {
  render() {
    console.log(props);
    return (
      <Stack.Navigator initialRouteName="Drawer"
        screenOptions={{
          headerTintColor: '#FFFFFF',
          headerStyle: {
            backgroundColor: Color.BLACK,
            borderBottomColor: Color.SECONDARY,
            borderWidth: 2,
          },
          headerBackTitleVisible: false ,
          headerTitle: (props) => <Logo {...props} />
        }}
        >
        {/* name prop refers to the name of the route and component prop specifies the component to render for the route. Both are required*/}
        <Stack.Screen name="Menú" component={DrawerMenu} options={{ headerShown: false }} />
        <Stack.Screen name="Inicio" component={HomeScreen} options={{ headerTitleAlign: "center" }}/>
        <Stack.Screen name="Floor" component={FloorScreen} options={{ headerTitleAlign: "center" }} />
        <Stack.Screen name="Collection" component={CollectionScreen} options={{ headerTitleAlign: "center" }}/>
        <Stack.Screen name="Item" component={ItemScreen} options={{ headerTitleAlign: "center" }}/>
      </Stack.Navigator>
    )
  }
}

const styles = StyleSheet.create({
  logo: {
    height: 33,
    width: 83
  }
});

export default AppNavigator;
