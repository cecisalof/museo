import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import AppLoading from 'expo-app-loading';
import { Provider } from 'react-redux'
import { useFonts } from 'expo-font';
import { FONT_FAMILY_REGULAR, FONT_FAMILY_BOLD } from './src/assets/styles/typography'
import { translations } from './src/translations'
import store from './src/store/store';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

i18n.translations = translations;
i18n.defaultLocale = 'es';
i18n.locale = Localization.locale;
// When a value is missing from a language it'll fallback to another language with the key present.
i18n.fallbacks = true;

function App() {
  let [fontsLoaded] = useFonts({
    FONT_FAMILY_REGULAR,
    FONT_FAMILY_BOLD
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
