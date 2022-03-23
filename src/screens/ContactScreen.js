import {
  Text,
  View,
  Image,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Platform
} from "react-native";
import { Color, Font } from '../assets/styles/index.js';
import Header from '../components/atoms/Header.js';

export default function Contact (){
  return (
    <View style={styles.showcaseContainer}>
      <Header headerName={"Contacta con nosostros"} showOtherFloors={false}/>
      <View style={styles.itemsContainer}>
        <Text>Hola</Text>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  showcaseContainer: {
    flex: 1,
    backgroundColor: Color.BLACK,
    justifyContent: 'center',
  },
  showcaseList: {
    width: "100%"
  },
  itemsContainer: {
    flex: 3
  }
})
