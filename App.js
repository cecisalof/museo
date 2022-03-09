import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import AppLoading from 'expo-app-loading';
import { Provider } from 'react-redux'
import { useFonts, Roboto_700Bold, Roboto_400Regular } from '@expo-google-fonts/roboto';
// import * as Typo from './src/assets/styles/typography'
import store from './src/store/store';

function App() {
  let [fontsLoaded] = useFonts({
    Roboto_700Bold,
    Roboto_400Regular
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  console.log('MIRA', store.getState());

  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
