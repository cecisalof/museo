import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Color, Font } from '../assets/styles/index.js';
import {
  Text,
  View,
  Button,
  FlatList,
  StyleSheet,
  Image,
  ImageBackground,
  Platform,
  Animated,
  ScrollView,
  TouchableOpacity
} from "react-native";
import {
  setItems,
} from "../store/itemActions";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import { Audio } from 'expo-av';

class ItemScreen extends Component {

  async componentDidMount() {
      Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
      this.sound = new Audio.Sound();
      console.log(this.sound);

      const status = {
        shouldPlay: false
      }
     this.sound.loadAsync('https://gaselec-back-static.s3.amazonaws.com/MUSICA_DE_EGIPTO_SIN_DERECHOS_DE_AUTOR_TMSC_1.mp3', {shouldPlay: false});  }


  playSound() {
    console.log('Playing Sound');
    this.sound.playAsync();
  }


  scrollX = new Animated.Value(0);

  render() {
    const { item, panels } = this.props.route.params;
    const itemImages = item.image_set;
    {/* DETALLE DE PIEZA*/}
    return (
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.headerContent}>
            <View style={styles.headerTitle}><Image source={require('../assets/images/personPin.png')} style={styles.avatar}/><Text style={styles.headerTitleText}>{item.title_es}</Text></View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.navigationButton}><Text style={styles.navigationButtonText}>Volver</Text></TouchableOpacity>
          </View>
        </View>
        <View style={styles.scrollContainer}>
          <ScrollView
          horizontal={true}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event([
          {
            nativeEvent: {
              contentOffset: {
                x: this.scrollX
              }
            }
          }
        ], {useNativeDriver: false})}
        scrollEventThrottle={1}
      >
        {itemImages.map((image, imageIndex) => {
          return (
            <View
              style={styles.imageContainer}
              key={imageIndex}
            >
              <Image source={{ uri: image.image }} style={styles.card}></Image>
            </View>
          );
        })}
      </ScrollView>
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.border}>
            <View><Text style={styles.smallText}>Categoría</Text></View>
            <View style={styles.titleContainer}>
              <Text style={styles.itemTitle}>{item.title_es}</Text>
              <View style={styles.iconsContainer}>
                <TouchableOpacity style={styles.buttons}><Image style={styles.book} source={require('../assets/images/icons/book-icon.png')}></Image></TouchableOpacity>
                <TouchableOpacity style={styles.buttons} onPress={this.playSound.bind(this)} ><Image style={styles.play} source={require('../assets/images/icons/play-icon.png')}></Image></TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.itemDescription}>
            <Text style={styles.smallText}>{item.description_es}</Text>
            <View style={styles.iconTextRow}><Image style={styles.descriptionIcons} source={require('../assets/images/icons/materials.png')}></Image><Text style={styles.smallText}>{item.material_es}</Text></View>
            <View style={styles.iconTextRow}><Image style={styles.descriptionIcons} source={require('../assets/images/icons/date.png')}></Image><Text style={styles.smallText}>{item.date_es}</Text></View>
          </View>
        {/*  // <Text>Para este item hay {item.image_set && item.image_set.length} imágenes y {panels && panels.length} paneles</Text> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: Color.PRIMARY,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  headerContainer:{
    flex: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    ...Platform.select({
      ios: {
        marginRight: '3%'
       },
      android: {
        marginRight: '5%'
      },
      default: {
        marginRight: '5%'
      }
    }),
    backgroundColor: Color.BLACK,
    width: '100%'
  },
  buttonContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  navigationButton:{
    marginHorizontal: '10%'
  },
  navigationButtonText: {
    fontFamily: 'Roboto',
    color: Color.WHITE,
    fontSize: 12,
    justifyContent: 'flex-end',
  },
  headerContent: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: '5%'
  },
  headerTitle: {
    flexDirection: 'row'
  },
  headerTitleText: {
    fontSize: 16,
    fontFamily: 'Roboto',
    color: Color.WHITE,
    marginLeft: 7
  },
  avatar: {
    ...Platform.select({
      ios: {
        width: 21,
        height: 21
       },
      android: {
        width: 21,
        height: 21
      },
      default: {
        width: 21,
        height: 21
      }
    })
  },
  sliderContainer: {
    flex: 2,
    width: '100%',
    backgroundColor: Color.BLACK
  },
  detailsContainer: {
    flex: 4,
    marginHorizontal: '4%',
    marginVertical: '2%'
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '3%'
  },
  smallText:{
    flexDirection: 'column',
    fontSize: responsiveFontSize(1.9),
    lineHeight: responsiveHeight(2.7),
    fontFamily: 'Roboto',
    marginVertical: responsiveHeight(0.5)
  },
  itemTitle: {
    flex: 1,
    fontSize: responsiveFontSize(2.5),
    fontFamily: 'Roboto-Bold',
    lineHeight: 21,
    color: Color.BLACK
  },
  iconsContainer:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  buttons:{
    marginHorizontal: '5%'
  },
  book: {
    marginHorizontal: '5%',
    width: responsiveWidth(100) >= 425 ? responsiveWidth(6) : 30,
    height: responsiveHeight(100) >= 800 ? responsiveHeight(3.5) : 25
  },
  play: {
    alignItems: 'center',
    width: responsiveWidth(100) >= 425 ? responsiveWidth(6) : 24,
    height: responsiveHeight(100) >= 800 ? responsiveHeight(4) : 24
  },
  container: {
  flex: 1,
  alignItems: "center",
  justifyContent: "center"
  },
  scrollContainer: {
    height: responsiveHeight(30),
    alignItems: "center",
    justifyContent: "center"
  },
  imageContainer: {
    width: responsiveWidth(100),
    height: responsiveHeight(30)
  },
  card: {
    flex: 1,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center"
  },
  itemDescription: {
    marginVertical: '2%'
  },
  iconTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: '1%',
  },
  descriptionIcons: {
    width: responsiveWidth(100) >= 425 ? responsiveWidth(4.5) : responsiveWidth(6),
    height: responsiveHeight(100) >= 800 ? responsiveHeight(3) : responsiveHeight(3.7),
    marginRight: '5%'
  },
  border: {
    borderBottomColor: Color.SECONDARY,
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderWidth: 2
  }
})

//---- Connect to props functions and values -----//
function mapStateToProps({items}) {
  return {items}
}

export default connect(mapStateToProps)(ItemScreen);
