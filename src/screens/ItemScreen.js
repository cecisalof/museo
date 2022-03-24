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


class ItemScreen extends Component {
  scrollX = new Animated.Value(0);

  render() {
    const { item, panels } = this.props.route.params;
    const itemImages = item.image_set;
    console.log(itemImages);
    console.log({item});
    console.log({panels});
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
              imageStyle={{
               resizeMode: "cover",
               alignSelf: "flex-start"
             }}
              key={imageIndex}
            >
              <ImageBackground source={{ uri: image.image }} style={styles.card}></ImageBackground>
            </View>
          );
        })}
      </ScrollView>
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.itemTitle}>{item.title_es}</Text>
            <View style={styles.iconsContainer}>
              <Image style={styles.book} source={require('../assets/images/icons/book-icon.png')}></Image>
              <Image style={styles.play} source={require('../assets/images/icons/play-icon.png')}></Image>
            </View>
          </View>
          <Text>Para este item hay {item.image_set && item.image_set.length} imágenes y {panels && panels.length} paneles</Text>
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
    marginVertical: '5%'
  },
  titleContainer: {
    flexDirection: 'row'
  },
  itemTitle: {
    flex: 1,
    fontSize: 18,
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
  book: {
    marginHorizontal: '5%',
    ...Platform.select({
      ios: {
        width: 30,
        height: 23
       },
      android: {
        width: 30,
        height: 23
      },
      default: {
        width: 30,
        height: 23
      }
    })
  },
  play: {
    alignItems: 'center',
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
    }),
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
  }
})

//---- Connect to props functions and values -----//
function mapStateToProps({items}) {
  return {items}
}

export default connect(mapStateToProps)(ItemScreen);
