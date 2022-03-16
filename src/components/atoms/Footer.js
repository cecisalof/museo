import HomeScreen from '../../screens/HomeScreen.js';
import {
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  PlatformColor
} from "react-native";
import { Color, Font } from '../../assets/styles/index.js';
import shopIcon from '../../assets/images/icons/shoppingBag.png';



const Footer = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity><Image source={shopIcon} /></TouchableOpacity>
      <TouchableOpacity><Image source={shopIcon} /></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    position: 'absolute',
    top:0,
    left:0,
    right:0,
    backgroundColor: '#000',
    borderTopColor: Color.SECONDARY,
    height: 15
  }
});

export default Footer;
