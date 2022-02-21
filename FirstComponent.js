
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import logo from './assets/logo.png'; 

export default function App() {
  return (
  <View style={styles.container}>
    <Image source={logo} style={styles.logo}/> 
    <View stye={styles.btnContainer}>
    <TouchableOpacity
      onPress={() => alert('Hello, world!')}>
        <Text style={styles.btn}>Inicializando</Text>
    </TouchableOpacity>
    </View>
 </View>
  );
}

const styles = StyleSheet.create({
  label: {
    padding: 16,
    // ...Platform.select({
    //   ios: {
    //     color: PlatformColor('label'),
    //     backgroundColor:
    //       PlatformColor('systemOrange'),
    //   },
    //   android: { 
    //     color: PlatformColor('?android:attr/textColor'),
    //     backgroundColor:
    //       PlatformColor('@android:color/holo_blue_bright'),
    //   },
    //   default: { color: 'black' }
    // })
  },
  container: {
    flex: 1,
    backgroundColor: '#211F20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 300,
    height: 150,
    marginBottom: 20,
  },
  // text: {
  //   fontSize: 18,
  //   color: '#fff',
  //   marginHorizontal: 15,
  // },
  btn: {
    fontSize: 18, 
    color: '#fff',
    backgroundColor: '#D18767',
    padding: 10,
    borderRadius: 5,
  },
  // btnContainer: {
  //   flex: 1,
  //   backgroundColor: 'red'
  // }
});