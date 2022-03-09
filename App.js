import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppNavigator from './src/navigation/AppNavigator';
import AppLoading from 'expo-app-loading';
import { useFonts, Roboto_700Bold, Roboto_400Regular } from '@expo-google-fonts/roboto';
// import * as Typo from './src/assets/styles/typography'
import store from './src/store/store';
import { Provider } from 'react-redux'

import HomeScreen from './src/screens/HomeScreen';
// function HomeScreen({ navigation }) {
//   return (
//     <Provider store={store}>
//       <NavigationContainer>
//         <AppNavigator />
//       </NavigationContainer>
//     </Provider>
//   );
// }
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
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
