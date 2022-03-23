import {
  Text,
  View,
  Image,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Linking,
  ImageBackground
} from "react-native";
import { Color, Font } from '../assets/styles/index.js';

export default function Contact (){
  return (
    <View style={styles.blackBackground}>
      <ImageBackground source={require('../assets/images/background.png')} style={styles.bg}>
      <View style={styles.mainContainer}>

        <View style={[styles.rowContainer, styles.rowHeader]}>
          <Image source={require('../assets/images/personPin.png')} style={styles.avatar}/>
          <Text style={styles.itemText}>{"Contacta con nosotros"}</Text>
        </View>

        <TouchableOpacity onPress={() => Linking.openURL('https://www.google.com/maps?ll=35.289145,-2.941312&z=16&t=m&hl=es&gl=ES&mapclient=embed&cid=15470094306678974670')} style={styles.mapContainer}>
          <Image source={require('../assets/images/contact/map.jpg')} style={styles.mapItem}/>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Linking.openURL('https://www.google.com/maps?ll=35.289145,-2.941312&z=16&t=m&hl=es&gl=ES&mapclient=embed&cid=15470094306678974670')} style={styles.rowContainer}>
          <Image source={require('../assets/images/contact/pin.png')} style={styles.avatar}/>
          <Text style={styles.itemText}>{"C/Comandante Aviador García Morato, 3 52006 - Melilla"}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Linking.openURL('tel:+34952671902')} style={styles.rowContainer}>
          <Image source={require('../assets/images/contact/phone.png')} style={[styles.avatar, styles.avatarPhone]}/>
          <Text style={styles.itemText}>{"952 67 19 02 - 952 67 15 75"}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Linking.openURL('mailto:info@fundaciongaselec.es')} style={styles.rowContainer}>
          <Image source={require('../assets/images/contact/mail.png')} style={styles.avatar}/>
          <Text style={styles.itemText}>{"info@fundaciongaselec.es"}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Linking.openURL('https://fundaciongaselec.es/museo-egipcio/')} style={styles.rowContainer}>
          <Image source={require('../assets/images/contact/calendar.png')} style={styles.avatar}/>
          <View>
            <Text style={styles.itemText}>{"Lunes-Viernes: 8-15h / Sábados: 8:30-13h"}</Text>
            <Text style={[styles.itemText, styles.textSmall]}>{"*Domingos y festivos cerrado"}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Linking.openURL('https://fundaciongaselec.es/museo-egipcio/')} style={[styles.rowContainer, styles.buttonContainer]}>
          <Text style={styles.itemButton}>{"Reservar"}</Text>
        </TouchableOpacity>
      </View>
      </ImageBackground>
    </View>
  );
}


const styles = StyleSheet.create({
  blackBackground: {
    flex: 1,
    backgroundColor: Color.BLACK,
    justifyContent: 'center',
  },
  bg: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    maxWidth: 800,
  },
  showcaseList: {
    width: "100%"
  },
  itemsContainer: {
    flex: 3
  },
  rowContainer: {
    flexDirection: 'row',
    marginHorizontal: '5%',
    flex: 1,
    alignItems: 'center'
  },
  rowHeader: {
    flex: 1
  },
  mapContainer: {
    flexDirection: 'row',
    flex: 2,
  },
  mapItem: {
    height: '100%',
    width: '100%',
  },
  itemText: {
    fontSize: 16,
    fontFamily: 'Roboto',
    color: Color.WHITE,
    marginLeft: 7,
    paddingRight: 10
  },
  textSmall: {
    fontSize: 12,
  },
  avatar: {
    width: 30,
    height: 30,
    resizeMode: "cover",
    marginRight: 5
  },
  avatarPhone: {
    width: 24,
    height: 24,
    margin: 3,
    marginRight: 8
  },
  buttonContainer: {
    alignItems: "center",
    flexDirection: 'column',
  },
  itemButton: {
    backgroundColor: Color.PRIMARY,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10
  }
})
