import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen({ navigation }) { /* */
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.navigate('Details', {
            itemId: 86,
            otherParam: 'anything you want here',
          });
        }}
      />
    </View>
  );
}

function DetailsScreen({ route, navigation }) {
  const { itemId, otherParam } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Button
        title="Go to Shop"
        onPress={() => navigation.push('Shop')} /* Each time you call push we add a new route to the navigation stack */
      />
      {/* To go to the top route of the stack we can use navigation.popToTop(), or in this case .navigate('Home') */}
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} /> 
      <Button title="Go back" onPress={() => navigation.goBack()} />
      {/* <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      /> */}
    </View>
  );
}

function ShopScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator(); 

function App() {
  return (
    <NavigationContainer>
    {/* Stack Navigator is a component that takes the route configuration as its children. InitialRouteName prop helps to specify what the initial route in a stack is */} 
      <Stack.Navigator initialRouteName="Home">
        {/* name prop refers to the name of the raoute and component prop specifies the component to render for the route. Both are required*/}
        <Stack.Screen name="Home" component={HomeScreen}  options={{ title: 'Overview' }} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Shop" component={ShopScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



export default App;

