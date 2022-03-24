import HomeScreen from '../../screens/HomeScreen.js';
import {
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  PlatformColor,
  Linking
} from "react-native";
import { Color, Font } from '../../assets/styles/index.js';

const Footer = (props) => {
  return (
    <View style={styles.container} elevation={5}>
      <View style={styles.footer}>
        <TouchableOpacity onPress = {() => Linking.openURL('https://fundaciongaselec.es/tienda/')}><Image source={require('../../assets/images/icons/shoppingBag.png')} style={styles.icons}/></TouchableOpacity>
        <Image source={require('../../assets/images/gaselec-logo.png')} style={styles.gaselecLogo}></Image>
        <TouchableOpacity onPress = {() => props.onPressNavigateContact()}><Image source={require('../../assets/images/icons/pin.png')} style={styles.icons}/></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000',
    height: 82,
    borderTopColor: Color.SECONDARY,
    borderWidth: 1,
    // shadowColor: "#000",
    // shadowOpacity: 0.25,
    // shadowRadius: 2,
    // shadowOffset: {
    //   height: 1,
    //   width: 1
    // }
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  icons: {
    ...Platform.select({
      ios: {
        width: 24,
        height: 24
       },
      android: {
        width: 24,
        height: 24
      },
      default: {
        width: 24,
        height: 24
      }
    })
  },
  gaselecLogo:{
    ...Platform.select({
      ios: {
        width: '20%',
        height: '50%'
       },
      android: {
        width: '20%',
        height: '50%'
      },
      default: {
        width: 73,
        height: 35
      }
    })
  }
});

export default Footer;
