import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
// import AppLoading from 'expo-app-loading';
import { Provider } from 'react-redux'
import { useFonts } from 'expo-font';
import * as Font from 'expo-font';
import { translations } from './src/translations'
import store from './src/store/store';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

i18n.translations = translations;
i18n.defaultLocale = 'es';
i18n.locale = Localization.locale;
// When a value is missing from a language it'll fallback to another language with the key present.
i18n.fallbacks = true;

export default class App extends React.Component {
  state = {
    fontsLoaded: false,
  };

  async loadFonts() {
    await Font.loadAsync({
      // Load a font `Montserrat` from a static resource
      Roboto: require('./src/assets/fonts/Roboto-Regular.ttf'),

      // Any string can be used as the fontFamily name. Here we use an object to provide more control
      'Roboto-Bold': {
        uri: require('./src/assets/fonts/Roboto-Bold.ttf'),
        display: Font.FontDisplay.FALLBACK,
      },
    });
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this.loadFonts();
  }

  render() {
    if (this.state.fontsLoaded) {
     return (
       <Provider store={store}>
         <NavigationContainer>
           <AppNavigator />
         </NavigationContainer>
       </Provider>
     );
     } else {
        return null;
      }
  }
};
