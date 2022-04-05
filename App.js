import 'react-native-gesture-handler';
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
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import Footer from './src/components/atoms/Footer.js'
import AppLoading from 'expo-app-loading';
import DrawerMenu from './src/navigation/DrawerNavigator';
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

export default function App() {
  const navigationRef = useNavigationContainerRef();

  let [fontsLoaded] = useFonts({
    // Load a font `Roboto` from a static resource
    Roboto: require('./src/assets/fonts/Roboto-Regular.ttf'),
    // Any string can be used as the fontFamily name. Here we use an object to provide more control
    'Roboto-Bold': {
      uri: require('./src/assets/fonts/Roboto-Bold.ttf'),
      display: Font.FontDisplay.FALLBACK,
    },
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
     <Provider store={store}>
       <View style={styles.mainContainer}>
        <NavigationContainer ref={navigationRef}>
          <View style={styles.body}>
            <DrawerMenu navigationRef={navigationRef}/>
          </View>
          <View style={styles.footer}>
            <Footer onPressNavigateContact={() => navigationRef.navigate('Contact')}/>
          </View>
        </NavigationContainer>
      </View>
     </Provider>
   );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  body: {
    flex: 4
  },
  footer: {
    flex: 0.5
  }
});
