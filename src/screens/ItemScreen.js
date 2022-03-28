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
  TouchableOpacity,
  SafeAreaView
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
import moment from 'moment';
import Slider from '@react-native-community/slider';

class ItemScreen extends Component {
  state = {
   isPlaying: false,
   playbackInstance: null,
   currentIndex: 0,
   volume: 1.0,
   isBuffering: false,
   trackTotalDuration: 0,
   positionInTrack: 0,
   soundStatus: null,
   currentTrackDuration: 0
  }

  async componentDidMount() {
    try {
      {/*define how the audio player is going to behave.*/}
       await Audio.setAudioModeAsync({
         allowsRecordingIOS: false,
         interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
         playsInSilentModeIOS: true,
         interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
         shouldDuckAndroid: true,
         staysActiveInBackground: true,
         playThroughEarpieceAndroid: true
          })
          this.loadAudio()
      } catch (e) {
          console.log(e)
        }
      }

      async loadAudio() {
        const {currentIndex, isPlaying, volume} = this.state

        try {
          const playbackInstance = new Audio.Sound()
          console.log('objeto de audio', playbackInstance);
          const source = {
            // uri: audioBookPlaylist[currentIndex].uri
            uri: this.props.route.params.item.audio_es
          }

          const status = {
            shouldPlay: isPlaying,
            volume
          }

          playbackInstance.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate)
          await playbackInstance.loadAsync(source, status, false)
          this.setState({playbackInstance})
          } catch (e) {
            console.log(e)
          }

      }

      onPlaybackStatusUpdate = status => {
        this.setState({
          isBuffering: status.isBuffering
        })
      }

      getTrackDuration =  async () => {
        const { playbackInstance } = this.state
        const result = await playbackInstance.getStatusAsync();
        console.log('propiedades del objeto de audio', result);
        const milliToMinutes = moment(result.durationMillis).format("mm:ss")
        const positionMillis = moment(result.positionMillis).format("mm:ss")
        console.log('duración total', milliToMinutes);
        console.log('tiempo del track que ha sido reproducido', positionMillis);
        this.setState({
          trackTotalDuration: milliToMinutes,
          positionInTrack: positionMillis,
          soundProperties: result
        })
      }

      handlePlayPause = async () => {
      const { isPlaying, playbackInstance } = this.state
      this.getTrackDuration()
      isPlaying ? await playbackInstance.pauseAsync() : await playbackInstance.playAsync()
      this.setState({
        isPlaying: !isPlaying
      })
    }

  scrollX = new Animated.Value(0);

  render() {
    const { params } = this.props.route;
    const { item, panels } = this.props.route.params;
    const itemImages = item.image_set;
    const trackPositionPercentage = this.state.currentTrackDuration;
    console.log(trackPositionPercentage);
    {/* DETALLE DE PIEZA*/}
    return (
      <SafeAreaView style={styles.blackBackground}>
        <ImageBackground source={require('../assets/images/background.png')} style={styles.bg}>
        <View style={styles.mainContainer}>
          <View style={styles.headerContainer}>
            <View style={styles.headerContent}>
              <View style={styles.headerTitle}><Image source={require('../assets/images/personPin.png')} style={styles.avatar}/><Text style={styles.headerTitleText}>{item.title_es}</Text></View>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.navigationButton} onPress={()=> { this.props.navigation.goBack()}} ><Text style={styles.navigationButtonText}>Volver</Text></TouchableOpacity>
            { /* onPress={()=> { navigation.navigate('Collection', {collection: item, headerName: params.headerName, floorId: params.floorId}) }} */}
          </View>
          </View>
          {/* Image slider */}
          <View style={styles.scrollContainer}>
            <ScrollView
            style={styles.scroll}
            horizontal={true}
            pagingEnabled
            showsHorizontalScrollIndicator={true}
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
          {/* Main content */}
          <View style={styles.bgPrimary}>
            <View style={styles.detailsContainer}>
              <View style={styles.border}>
                <View><Text style={styles.smallText}>Categoría</Text></View>
                <View style={styles.titleContainer}>
                  <Text style={styles.itemTitle}>{item.title_es}</Text>
                  <View style={styles.iconsContainer}>
                    <TouchableOpacity style={styles.buttons}><Image style={styles.book} source={require('../assets/images/icons/book-icon.png')}></Image></TouchableOpacity>
                  </View>
                </View>
              </View>
              {/* Audio Player */}
              <View style={styles.sliderContainer}>
                <Slider
                  style={styles.slider}
                  value={trackPositionPercentage}
                  minimumValue={0}
                  maximumValue={1000}
                  minimumTrackTintColor={Color.SECONDARY}
                  maximumTrackTintColor="#787878"
                  thumbStyle={styles.thumb}
                />
              </View>
              <View style={styles.audioController}>
                <View style={styles.currentDurationContainer}>
                  <Text style={styles.totalDuration}>{this.state.positionInTrack}</Text>
                </View>
                <View style={styles.trackDurationContainer}>
                  <Text style={styles.totalDuration}>{this.state.trackTotalDuration}</Text>
                </View>
              </View>
              <View style={styles.audioPlayer}>
                <TouchableOpacity style={styles.audioButtons}><Image style={styles.audioIcons} source={require('../assets/images/audioPlayer/backwards.png')}></Image></TouchableOpacity>
                <TouchableOpacity style={styles.audioButtons}  onPress={this.handlePlayPause} ><Image style={styles.play} source={ this.state.isPlaying ? require('../assets/images/audioPlayer/pause.png') : require('../assets/images/icons/play-icon.png')}></Image></TouchableOpacity>
                <TouchableOpacity style={styles.audioButtons}><Image style={styles.audioIcons} source={require('../assets/images/audioPlayer/forward.png')}></Image></TouchableOpacity>
              </View>
              <View style={styles.itemDescription}>
                <ScrollView style={styles.scrollText}>
                  <Text style={styles.smallText}>{item.description_es}</Text>
                  <View style={styles.iconTextRow}><Image style={styles.descriptionIcons} source={require('../assets/images/icons/materials.png')}></Image><Text style={styles.smallText}>{item.material_es}</Text></View>
                  <View style={styles.iconTextRow}><Image style={styles.descriptionIcons} source={require('../assets/images/icons/date.png')}></Image><Text style={styles.smallText}>{item.date_es}</Text></View>
                </ScrollView>
              </View>
            </View>
          {/*  // <Text>Para este item hay {item.image_set && item.image_set.length} imágenes y {panels && panels.length} paneles</Text> */}
          </View>
        </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    maxWidth: 800
  },
  blackBackground: {
    flex: 1,
    backgroundColor: Color.BLACK,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  bg: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  headerContainer:{
    flex: 1.3,
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
    fontSize: responsiveFontSize(1.5),
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
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  headerTitleText: {
    fontSize: responsiveFontSize(1.8),
    flexWrap: 'nowrap',
    fontFamily: 'Roboto',
    color: Color.WHITE,
    marginLeft: '3%',
  },
  avatar: {
    marginRight: '1%',
    width: responsiveWidth(100) >= 768 ? responsiveWidth(5) : 24,
    height: responsiveHeight(100) >= 800 ? responsiveHeight(4) : 24
  },
  // sliderContainer: {
  //   flex: 2,
  //   width: '100%',
  //   backgroundColor: Color.BLACK
  // },
  bgPrimary: {
    flex: 4,
    backgroundColor: Color.PRIMARY
  },
  detailsContainer: {
    marginHorizontal: '4%',
    marginVertical: '2%'
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '3%',
  },
  smallText:{
    flexDirection: 'column',
    fontSize: responsiveFontSize(1.6),
    lineHeight: responsiveHeight(3),
    fontFamily: 'Roboto',
    marginVertical: responsiveHeight(0.5)
  },
  itemTitle: {
    fontSize: responsiveFontSize(2.5),
    fontFamily: 'Roboto-Bold',
    lineHeight: 21,
    color: Color.BLACK
  },
  iconsContainer:{
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginLeft: '20%'
  },
  buttons:{
    marginHorizontal: '5%'
  },
  book: {
    marginHorizontal: '7%',
    width: responsiveWidth(100) >= 768 ? responsiveWidth(6.5) : 30,
    height: responsiveHeight(100) >= 800 ? responsiveHeight(4) : 25
  },
  audioPlayer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '3%'
  },
  audioButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    marginHorizontal: '5%'
  },
  play:{
    width: responsiveWidth(100) >= 768 ? 40 : 20,
    height: responsiveHeight(100) >= 800 ? 40 : 20
  },
  audioIcons: {
    width: responsiveWidth(100) >= 768 ? 35 : 15,
    height: responsiveHeight(100) >= 800 ? 26 : 11
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
  scroll: {
    maxWidth: 800,
    width: responsiveWidth(100)
  },
  imageContainer: {
    width: responsiveWidth(100) >= 800 ? 800 : responsiveWidth(100),
    height: responsiveHeight(30)
  },
  card: {
    flex: 1,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center"
  },
  itemDescription: {
    height: responsiveHeight(15),
    marginVertical: '2%',
  },
  iconTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: '1%',
  },
  descriptionIcons: {
    width: 20,
    height: 20,
    marginRight: '5%'
  },
  border: {
    borderBottomColor: Color.SECONDARY,
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderWidth: 2,
    marginBottom: '3%'
  },
  sliderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(1)
  },
  slider: {
    width: responsiveWidth(50),
    height: '5%'
  },
  duration:{
    color: '#787878',
    fontSize: 14
  },
  trackDurationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(20),
    justifyContent: 'flex-end'
  },
  currentDurationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(20),
    justifyContent: 'flex-start'
  },
  totalDuration: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    color: '#787878',
    fontSize: 14
  },
  audioController: {
    flexDirection: 'row',
    marginVertical: responsiveHeight(1)
  },

})

//---- Connect to props functions and values -----//
function mapStateToProps({items}) {
  return {items}
}

export default connect(mapStateToProps)(ItemScreen);
