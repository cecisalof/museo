import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppLoading from 'expo-app-loading';
import { useFonts, Roboto_700Bold, Roboto_400Regular } from '@expo-google-fonts/roboto';
// import * as Typo from './src/assets/styles/typography'

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontFamily: 'Roboto_400Regular', fontSize: 16 }}>Home Screen</Text>
      <Button
        title="Go to Details"
        /* we call navigate function on navigation prop with the name of the route to move the user to*/
        onPress={() => navigation.navigate('Details', {
            itemId: 86,
            otherParam: 'anything you want here',
          })
          }
      />
    </View>
  );
}
const Stack = createNativeStackNavigator();


function App() {
  let [fontsLoaded] = useFonts({
  Roboto_700Bold,
  Roboto_400Regular
  });

  if (!fontsLoaded) {
     return <AppLoading />;
   }

  return (
    <NavigationContainer>
    {/* Stack Navigator is a component that takes the route configuration as its children. InitialRouteName prop helps to specify what the initial route in a stack is */}
      <Stack.Navigator initialRouteName="Home">
        {/* name prop refers to the name of the raoute and component prop specifies the component to render for the route. Both are required*/}
        <Stack.Screen name="Home" component={HomeScreen}  options={{ title: 'Overview' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



export default App;
