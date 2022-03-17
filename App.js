import 'react-native-gesture-handler';
import { Component } from 'react';
import {
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  PlatformColor,
  SafeAreaView
} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import DrawerMenu from './src/navigation/DrawerNavigator';
import Footer from './src/components/atoms/Footer.js'
import AppLoading from 'expo-app-loading';
import AppNavigator from './src/navigation/AppNavigator';
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

export default class App extends Component {
  state = {
    fontsLoaded: false,
  };

  async loadFonts() {
    await Font.loadAsync({
      // Load a font `Roboto` from a static resource
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
    if (!this.state.fontsLoaded) {
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
};
