import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import AppLoading from 'expo-app-loading';
import { Provider } from 'react-redux'
import { useFonts } from 'expo-font';
import { FONT_REGULAR, FONT_BOLD } from './src/assets/styles/typography'
// import * as Typo from './src/assets/styles/typography'
import store from './src/store/store';

function App() {
  console.log('MIRA', store.getState());
  console.log(FONT_REGULAR);
  let [fontsLoaded] = useFonts({
    FONT_REGULAR,
    FONT_BOLD
  });

  if (!fontsLoaded) {
    console.log('no carga la typo');
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
