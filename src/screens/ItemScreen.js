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
  SafeAreaView,
  Dimensions
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
import { StackActions, CommonActions, DrawerActions } from '@react-navigation/native';


const window = Dimensions.get("window");

class ItemScreen extends Component {
  state = {
   isPlaying: false,
   audioInstance: null,
   soundObj: null,
   volume: 1.0,
   isBuffering: false,
   trackTotalDuration: '00:00',
   positionInTrack: '00:00',
   currentTrackDuration: 0,
   dimensions: {
      window
    }
  }

  onDimensionsChange = ({ window }) => {
    this.setState({ dimensions: { window } });
  };

  async componentDidMount() {
    try {
      {/*define how the audio player is going to behave.*/}
       await Audio.setAudioModeAsync({
         allowsRecordingIOS: false,
         interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
         playsInSilentModeIOS: true,
         interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
         shouldDuckAndroid: false,
         staysActiveInBackground: true,
         playThroughEarpieceAndroid: true
          })
          this.loadAudio()
          Dimensions.addEventListener("change", this.onDimensionsChange);
      } catch (e) {
          console.log(e)
        }
  }

      async loadAudio() {
        if (this.state.audioInstance == null) {
          const {isPlaying, volume} = this.state

          try {
            const audioInstance = new Audio.Sound()
            const source = {
              uri: this.props.route.params.item.audio_es
            }

            const status = {
              shouldPlay: isPlaying,
              volume
            }

            audioInstance.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate)
            const soundObj= await audioInstance.loadAsync(source, status, false)
            this.setState({audioInstance, soundObj: soundObj})
            } catch (e) {
              console.log(e)
            }
        }
      }

      onPlaybackStatusUpdate = status => {
        // console.log('Sound object changing in real time', status);
        const positionMillis = moment(status.positionMillis).format("mm:ss")
        this.setState({
          isBuffering: status.isBuffering,
          positionInTrack: positionMillis,
        })
      }

      /* get audioInstance duration */
      getTrackDuration =  async () => {
        const { audioInstance } = this.state
        const audioStatus = await audioInstance.getStatusAsync();
        const milliToMinutes = moment(audioStatus.durationMillis).format("mm:ss")
        const positionMillis = moment(audioStatus.positionMillis).format("mm:ss")
        this.setState({
          trackTotalDuration: milliToMinutes,
          positionInTrack: positionMillis
        })
      }

      /*Update slider position*/
      updateSlider = async () => {
        try {
          const audioObject = await this.state.audioInstance.getStatusAsync();
          if (audioObject.isLoaded == true) {
            const percentage = (audioObject.positionMillis / audioObject.durationMillis) * 100;
             this.setState({
               currentTrackDuration: percentage
            })
        }
          } catch (error) {
           console.log('Error');
         }
       }

      /* Play & pause */
      handlePlayPause = async () => {
        if(this.state.audioInstance == null){
          return
        } else {
        const { isPlaying, audioInstance, positionInTrack } = this.state
        isPlaying ? await audioInstance.pauseAsync() : await audioInstance.playAsync()
        this.setState({
          isPlaying: !isPlaying
        })
        this.getTrackDuration()
        this.updateSlider()
        }
      }

    /* Forward */
    handleForward = async () => {
      const { audioInstance } = this.state
      const { positionMillis, durationMillis } = await audioInstance.getStatusAsync()
      if (positionMillis == durationMillis) {
        await audioInstance.setPositionAsync(0)
      } else {
        const plusTen = await audioInstance.setPositionAsync(positionMillis + 10000)
      }
    }

  /* Rewind */
  handleRewind = async () => {
    const { audioInstance } = this.state
    const { positionMillis } = await audioInstance.getStatusAsync()
    if (positionMillis == 0) {
      return
    } else {
      const minusTen = await audioInstance.setPositionAsync(positionMillis - 10000)
    }
  }

  /* Slider Scroll */
  scrollX = new Animated.Value(0);


  /* Navigate back to collection View*/
  navigateBack = () => {
    this.props.navigation.dispatch(
      CommonActions.reset({
          index: 0,
          routes: [{ name: 'Collection', params: {
          collection: this.props.route.params.collection,
          floorName: this.props.route.params.floorName,
          floorId: this.props.route.params.floorId}
        }],
      })
    );
  }

  /* audio will pause when user change the screen*/
  async componentWillUnmount() {
      if (this.state.audioInstance == null) {
        return
      } else {
        await this.state.audioInstance.stopAsync();
        await this.state.audioInstance.unloadAsync();
        console.log('done', this.state.audioInstance._loaded, this.state.audioInstance._loading );
      }
  }


  render() {
    const { params } = this.props.route;
    const { item, panels } = this.props.route.params;
    const itemImages = item.image_set;
    const trackPositionPercentage = this.state.currentTrackDuration;
    const windowWidth = this.state.dimensions.window.width;
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
              <TouchableOpacity style={styles.navigationButton} onPress={this.navigateBack} ><Text style={styles.navigationButtonText}>Volver</Text></TouchableOpacity>
            { /* onPress={()=> { navigation.navigate('Collection', {collection: item, headerName: params.headerName, floorId: params.floorId}) }} */}
          </View>
          </View>
          {/* Image slider */}
          <View style={styles.scrollContainer}>
            <ScrollView
            style={styles.scroll}
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
            <View style={styles.indicatorContainer}>
             {itemImages.map((image, imageIndex) => {
               const width = this.scrollX.interpolate({
                 inputRange: [
                   windowWidth * (imageIndex - 1),
                   windowWidth * imageIndex,
                   windowWidth * (imageIndex + 1)
                 ],
                 outputRange: [8, 16, 8],
                 extrapolate: "clamp"
               });
               return (
                 <Animated.View
                   key={imageIndex}
                   style={[styles.normalDot, { width }]}
                 />
               );
             })}
           </View>
          </View>
          {/* Main content */}
          <View style={styles.bgPrimary}>
            <View style={styles.detailsContainer}>
              <View style={styles.border}>
                <View><Text style={styles.smallText}>Categoría</Text></View>
                <View style={styles.titleContainer}>
                  <View style={styles.title}>
                    <Text style={styles.itemTitle}>{item.title_es}</Text>
                  </View>
                  <View style={styles.iconsContainer}>
                    <TouchableOpacity style={styles.buttons} onPress={() => this.props.navigation.navigate('Panel')} ><Image style={styles.book} source={require('../assets/images/icons/book-icon.png')}></Image></TouchableOpacity>
                  </View>
                </View>
              </View>
              {/* Audio Player */}
              <View style={styles.sliderContainer}>
                <Slider
                  style={styles.slider}
                  value={trackPositionPercentage}
                  minimumValue={0}
                  maximumValue={100}
                  minimumTrackTintColor={Color.SECONDARY}
                  maximumTrackTintColor="#787878"
                  thumbStyle={styles.thumb}
                  trackStyle={styles.track}
                  onSlidingComplete={ async (trackPositionPercentage) => {
                    try {
                      const audioObject = await this.state.audioInstance.getStatusAsync();
                      if (audioObject.isLoaded == true) {
                        const currentPositionMilis = Math.round(audioObject.durationMillis * trackPositionPercentage / 100)
                        await this.state.audioInstance.setPositionAsync(currentPositionMilis)
                      }
                    } catch (error) {
                       console.log('Error');
                     }
                  }}
                />
              </View>
              <View style={styles.audioController}>
                <View style={styles.currentDurationContainer}>
                  { this.state.audioInstance == null &&
                  <Text style={styles.totalDuration}>00:00</Text>
                  }
                  { this.state.audioInstance !== null &&
                  <Text style={styles.totalDuration}>{this.state.positionInTrack}</Text>
                  }
                </View>
                <View style={styles.trackDurationContainer}>
                  { this.state.audioInstance == null &&
                    <Text style={styles.totalDuration}>00:00</Text>
                  }
                  { this.state.audioInstance !== null &&
                    <Text style={styles.totalDuration}>{this.state.trackTotalDuration}</Text>
                  }
                </View>
              </View>
              <View style={styles.audioPlayer}>
                <TouchableOpacity style={styles.audioButtons} onPress={this.handleRewind}><Image style={styles.audioIcons} source={require('../assets/images/audioPlayer/backwards.png')}></Image></TouchableOpacity>
                <TouchableOpacity style={styles.audioButtons}  onPress={this.handlePlayPause} ><Image style={styles.play} source={ this.state.isPlaying ? require('../assets/images/audioPlayer/pause.png') : require('../assets/images/icons/play-icon.png')}></Image></TouchableOpacity>
                <TouchableOpacity style={styles.audioButtons} onPress={this.handleForward}><Image style={styles.audioIcons} source={require('../assets/images/audioPlayer/forward.png')}></Image></TouchableOpacity>
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
    flex: 2,
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
    fontSize: responsiveWidth(100) >= 820 ? 14 : responsiveFontSize(1.5),
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
    fontSize: responsiveWidth(100) >= 820 ? 20 : responsiveFontSize(1.8),
    flexWrap: 'nowrap',
    fontFamily: 'Roboto',
    color: Color.WHITE,
    marginLeft: '3%',
  },
  avatar: {
    marginRight: '1%',
    width: responsiveWidth(100) >= 820 ? 30 : 24,
    height: responsiveHeight(100) >= 800 ? 35 : 24
  },
  bgPrimary: {
    flex: 10,
    backgroundColor: Color.PRIMARY
  },
  detailsContainer: {
    marginHorizontal: '4%',
    marginVertical: '2%'
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: responsiveWidth(100) > 820 ? '1%' : '3%',
  },
  title: {
    flex : 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  smallText:{
    flexDirection: 'column',
    fontSize: window.width > 820 ? responsiveFontSize(1) : responsiveFontSize(1.6),
    lineHeight: responsiveHeight(3),
    fontFamily: 'Roboto',
    marginVertical: responsiveHeight(0.5)
  },
  itemTitle: {
    fontSize: window.width > 820 ? responsiveFontSize(1.5) : responsiveFontSize(2.5),
    fontFamily: 'Roboto-Bold',
    lineHeight: 21,
    color: Color.BLACK
  },
  iconsContainer:{
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  buttons:{
    marginHorizontal: '5%'
  },
  book: {
    marginHorizontal: '7%',
    width: responsiveWidth(100) >= 768 ? 45 : 23,
    height: responsiveWidth(100) >= 768 ? 35 : 18
  },
  audioPlayer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '1%'
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
    width: responsiveWidth(100) >= 500 ? 40 : 20,
    height: responsiveWidth(100) >= 500 ? 40 : 20
  },
  audioIcons: {
    width: responsiveWidth(100) >= 500 ? 35 : 15,
    height: responsiveWidth(100) >= 500 ? 26 : 11
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
  scrollText: {
    marginBottom: responsiveWidth(100) > 820 ? '10%' : 0
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
    marginVertical: '3%'
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
    marginBottom: window.width > 820 ? '1%' : '3%'
  },
  sliderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: responsiveHeight(1)
  },
  slider: {
    width:  responsiveWidth(100) > 820 ? responsiveWidth(30) : responsiveWidth(50),
    height: '2%'
  },
  duration:{
    color: '#787878',
    fontSize: 14
  },
  trackDurationContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentDurationContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalDuration: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    color: '#787878',
    fontSize: responsiveWidth(100) >=820 ? 20 : 14
  },
  audioController: {
    flexDirection: 'row',
    marginVertical: '1%',
  },
  normalDot: {
   height: 8,
   width: 8,
   borderRadius: 4,
   backgroundColor: Color.WHITE,
   marginHorizontal: 4
 },
 indicatorContainer: {
   flexDirection: "row",
   position: 'absolute',
   bottom: 20
 },
 thumb: {
   ...Platform.select({
     ios: {
       backgroundColor: Color.SECONDARY,
       borderBottomRightRadius: 100
      },
     android: {
       marginRight: '5%'
     },
     default: {
       backgroundColor: Color.SECONDARY,
       borderBottomRightRadius: 100
     }
   }),
 },
 track: {
   height: 1
 }
})

//---- Connect to props functions and values -----//
function mapStateToProps({items}) {
  return {items}
}

export default connect(mapStateToProps)(ItemScreen);
