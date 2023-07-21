import 'react-native-gesture-handler';
import { useEffect, useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
} from "react-native";
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import Footer from './src/components/atoms/Footer.js'
import * as SplashScreen from 'expo-splash-screen';
import DrawerMenu from './src/navigation/DrawerNavigator';
import { Provider } from 'react-redux'
import { useFonts } from 'expo-font';
import * as Font from 'expo-font';
import store from './src/store/store';
import getDevicePushToken from './src/services/notifications.js';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {

  const navigationRef = useNavigationContainerRef();
  const [devicePushToken, setDevicePushToken] = useState('');

  console.log('devicePushToken', devicePushToken);

  useEffect(() => {
    getDevicePushToken().then((pushToken) => {
      console.log('Device pushToken', pushToken);
      setDevicePushToken(pushToken);
    });
  });
  
  const [fontsLoaded] = useFonts({
    // Load a font `Roboto` from a static resource
    Roboto: require('./src/assets/fonts/Roboto-Regular.ttf'),
    // Any string can be used as the fontFamily name. Here we use an object to provide more control
    'Roboto-Bold': {
      uri: require('./src/assets/fonts/Roboto-Bold.ttf'),
      display: Font.FontDisplay.FALLBACK,
    },
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      // This tells the splash screen to hide immediately!
      // We hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);


  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <View style={styles.mainContainer}
        onLayout={onLayoutRootView}>
        <NavigationContainer ref={navigationRef}>
          <View style={styles.body}>
            <DrawerMenu navigationRef={navigationRef} />
          </View>
          <View style={styles.footer}>
            <Footer onPressNavigateContact={() => navigationRef.navigate('Contact')} />
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
