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
  Dimensions,
  Modal
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
import { PinchGestureHandler, State, PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';
import moment from 'moment';
import Slider from '@react-native-community/slider';
import Header2 from '../components/atoms/Header2.js';
import ImageModal from '../components/atoms/ImageModal.js'
import i18n from 'i18n-js';
import translateFromBackend from '../utils/translate';

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

class ItemScreen extends Component {
  state = {
   isPlaying: false,
   audioInstance: null,
   soundObj: null,
   volume: 1.0,
   isBuffering: false,
   trackTotalDuration: '00:00',
   positionInTrack: '00:00',
   durationLeft: 0,
   currentTrackDuration: 0,
   dimensions: {
      window,
      screen
    },
  carrouselCurrentImage: 0,
  leftScroll: new Animated.Value(0),
  modalVisible: false,
  modalImageIndex: 0,
  }

  /* Slider Scroll */
  scrollX = new Animated.Value(0);
  /* Image zomm scale*/
  scale = new Animated.Value(1);
  /* Pan Value*/
  translateX = new Animated.Value(window.width / 2);

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
              uri: translateFromBackend(this.props.route.params.item, 'audio')
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

      onPlaybackStatusUpdate = async (status) => {
        // console.log('Sound object changing in real time', status);
         if (status.isLoaded == true) {
           const positionMillis = moment(status.positionMillis).format("mm:ss");
           const durationLeft = moment(status.durationMillis - status.positionMillis).format("mm:ss");
           const percentage = (status.positionMillis / status.durationMillis) * 100;
           this.setState({
             isBuffering: status.isBuffering,
             positionInTrack: positionMillis,
             durationLeft: durationLeft,
             currentTrackDuration: percentage
           })
         }
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
        }
      }

    /* Forward */
    handleForward = async () => {
      if(this.state.audioInstance == null){
        return
      } else {
        const { audioInstance } = this.state
        const { positionMillis, durationMillis } = await audioInstance.getStatusAsync()
        if (positionMillis == durationMillis) {
          await audioInstance.setPositionAsync(0)
        } else {
          const plusTen = await audioInstance.setPositionAsync(positionMillis + 10000)
        }
      }
    }

  /* Rewind */
  handleRewind = async () => {
    if(this.state.audioInstance == null){
      return
    } else {
      const { audioInstance } = this.state
      const { positionMillis } = await audioInstance.getStatusAsync()
      if (positionMillis == 0) {
        return
      } else {
        const minusTen = await audioInstance.setPositionAsync(positionMillis - 10000)
      }
    }
  }

  /* Navigation to Panel Screen*/
    toPanels = async () => {
      if (this.state.audioInstance == null) {
        this.props.navigation.navigate('Panel', {
        item: this.props.route.params.item,
        panels: this.props.route.params.collection.panel_set,
        collection: this.props.route.params.collection,
        floorName: this.props.route.params.floorName,
        floorId: this.props.route.params.floorId,
        routeName: 'Panel'})
      } else {
        await this.state.audioInstance.stopAsync(); // stops audio when user navigates to Panel View
        await this.state.audioInstance.setPositionAsync(0);
        this.setState({
          isPlaying: false
        })
        this.props.navigation.navigate('Panel', {
        item: this.props.route.params.item,
        panels: this.props.route.params.collection.panel_set,
        collection: this.props.route.params.collection,
        floorName: this.props.route.params.floorName,
        floorId: this.props.route.params.floorId,
        routeName: 'Panel' })
      }
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

  /* Carrousel buttons left & rigth */
  moveBody = index => {
       if(index >= this.props.route.params.item.image_set.length){
         index = 0
       }else if(index < 0){
         index = this.props.route.params.item.image_set.length
       }
       this.scrollRef.scrollTo({
         x: index * (responsiveWidth(100) > 800 ? 800 : responsiveWidth(100)),
         animation: false
       })
       this.setState({ carrouselCurrentImage: index });
       // console.log('Carrousel´s image parameters', index, this.state.carrouselCurrentImage)
   }

   /*Handle Modal*/
   setModalVisible = (visible, index) => {
     // console.log(index);
     // console.log(visible);
     /* change modal´s state -if it is open or not && setting carrouselCurrentImage to modalImageIndex*/
     this.setState({
      modalVisible: visible,
      modalImageIndex: index });
   }

   /* Get user´s gestue that modifies image´s scale*/
   onPinchEvent= Animated.event([
       {
         nativeEvent: {
           scale: this.scale
         }
       }
   ],
   {
     useNativeDriver: true
   }
 );

   /* Return image to inicial scale state when user releases the pinch gesture*/
   onPinchStateChange = (event) => {
     if (event.nativeEvent.oldState === State.ACTIVE) {
       Animated.spring( this.scale, {
         toValue: 1,
         useNativeDriver: true,
         bounciness: 1,
       }).start();
     }
   }

  handleScroll = (event) => {
    this.setState({carrouselCurrentImage: Math.round(event.nativeEvent.contentOffset.x/responsiveWidth(100))})
  }

  render() {
    const { params } = this.props.route;
    const { item, panels } = this.props.route.params;
    const itemImages = item.image_set;
    const trackPositionPercentage = this.state.currentTrackDuration;
    const windowWidth = this.state.dimensions.window.width;
    const screenWidth = this.state.dimensions.screen.width
    const leftScrollValue = this.state.leftScroll;
    const { modalVisible } = this.state;
    const carrouselCurrentImage = this.state.carrouselCurrentImage
    const modalImageIndex = this.state.modalImageIndex;

    {/* DETALLE DE PIEZA*/}
    return (
      <SafeAreaView style={styles.blackBackground}>
        <ImageBackground source={require('../assets/images/background.png')} style={styles.bg}>
        <View style={styles.mainContainer}>
          {/* Header */}
          <Header2 panels={panels} item={item} collection={this.props.route.params.collection}
            floorName={this.props.route.params.floorName}
            floorId={this.props.route.params.floorId}
            routeName={this.props.route.name}
            navigation={this.props.navigation}
          />
        {/* CARROUSEL CONTROL LEFT & RIGHT */}
          <View style={styles.scrollContainer}>
            { itemImages && itemImages.length > 1 && <TouchableOpacity style={[styles.navIconsContainer, {left: 20}]} onPress={()=> {this.moveBody(this.state.carrouselCurrentImage-1)}}>
              <Image style={styles.navIcons} source={require('../assets/images/icons/back.png')}></Image>
            </TouchableOpacity>}
            { itemImages && itemImages.length > 1 && <TouchableOpacity style={[styles.navIconsContainer, {right: 20}]} onPress={()=> {this.moveBody(this.state.carrouselCurrentImage+1)}}>
              <Image style={styles.navIcons} source={require('../assets/images/icons/next.png')}></Image>
            </TouchableOpacity>}
            <ScrollView
            ref={node => this.scrollRef = node}
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
            onMomentumScrollEnd={(event) => this.handleScroll(event)}
            scrollEventThrottle={1}
              >
              {/* Pop-up */}
              <SafeAreaView>
                <Modal
                  animationType="fade"
                  transparent={true}
                  visible={modalVisible}
                  modalImageIndex={this.state.modalImageIndex}
                  onRequestClose={() => {
                  setModalVisible(!modalVisible);
                  }}>
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.setModalVisible(!modalVisible, carrouselCurrentImage)}>
                        <Image source={require('../assets/images/icons/close-icon.png')} style={styles.buttonClose}/>
                      </TouchableOpacity>
                        <View
                          style={styles.imageContainer2}
                          key={this.state.modalImageIndex}
                        >
                        <GestureHandlerRootView>
                          <PinchGestureHandler
                            onGestureEvent= {this.onPinchEvent}
                            onHandlerStateChange={this.onPinchStateChange}
                            >
                            <Animated.Image source={{ uri: item.image_set[this.state.modalImageIndex].image }} style={[styles.modalImage, { transform: [{scale: this.scale}]}]}/>
                          </PinchGestureHandler>
                        </GestureHandlerRootView>
                      </View>
                    </View>
                  </View>
                </Modal>
              </SafeAreaView>
              {/* Image Carrousel */}
                {/* Open modal button*/}
              <TouchableOpacity onPress={() => this.setModalVisible(true, carrouselCurrentImage)} activeOpacity={1}  style={{ flex: 1, flexDirection: "row" }} >
                {itemImages.map((image, imageIndex) => {
                  return (
                    <View
                      style={styles.imageContainer}
                      key={imageIndex}
                    >
                    <Image source={{ uri: image.image }} style={styles.card}/>
                    </View>
                  );
                })}
              </TouchableOpacity>
              </ScrollView>
              {/* Carrousel Indicators*/}
              <View style={styles.indicatorContainer}>
               {itemImages.map((image, imagePaginationIndex) => {
                 const width = this.scrollX.interpolate({
                   inputRange: [
                     windowWidth * (imagePaginationIndex - 1),
                     windowWidth * imagePaginationIndex,
                     windowWidth * (imagePaginationIndex + 1)
                   ],
                   outputRange: [8, 16, 8],
                   extrapolate: "clamp"
                 });
                 return (
                   <Animated.View
                     key={imagePaginationIndex}
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
                <View><Text style={styles.smallText}>{i18n.t('itemScreen.category')}</Text></View>
                <View style={styles.titleContainer}>
                  <View style={styles.title}>
                    <Text style={styles.itemTitle}>{translateFromBackend(item,'title')}</Text>
                  </View>
                  <View style={styles.iconsContainer}>
                    <TouchableOpacity style={styles.buttons} onPress={this.toPanels} ><Image style={styles.book} source={require('../assets/images/icons/book-icon.png')}></Image></TouchableOpacity>
                  </View>
                </View>
              </View>
              {/* Audio Player */}
              <View style={styles.audioContainer}>
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
                    { this.state.audioInstance == null || this.state.durationLeft == 'Invalid date' &&
                      <Text style={styles.totalDuration}>00:00</Text>
                    }
                    { this.state.audioInstance !== null && this.state.durationLeft !== 'Invalid date' &&
                      <Text style={styles.totalDuration}>{this.state.durationLeft}</Text>
                    }
                  </View>
                </View>
                <View style={styles.audioPlayer}>
                  <TouchableOpacity style={styles.audioButtons} onPress={this.handleRewind}><Image style={styles.audioIcons} source={require('../assets/images/audioPlayer/backwards.png')}></Image></TouchableOpacity>
                  <TouchableOpacity style={styles.audioButtons}  onPress={this.handlePlayPause} ><Image style={styles.play} source={ this.state.isPlaying ? require('../assets/images/audioPlayer/pause.png') : require('../assets/images/icons/play-icon.png')}></Image></TouchableOpacity>
                  <TouchableOpacity style={styles.audioButtons} onPress={this.handleForward}><Image style={styles.audioIcons} source={require('../assets/images/audioPlayer/forward.png')}></Image></TouchableOpacity>
                </View>
              </View>
              <View style={styles.itemDescription}>
                <ScrollView style={styles.scrollText}>
                  <View>
                    <Text style={styles.smallText}>{translateFromBackend(item, 'description')}</Text>
                    <View style={styles.iconTextRow}><Image style={styles.descriptionIcons} source={require('../assets/images/icons/materials.png')}/><Text style={styles.smallText}>{translateFromBackend(item, 'material')}</Text></View>
                    <View style={styles.iconTextRow}><Image style={styles.descriptionIcons} source={require('../assets/images/icons/date.png')}/><Text style={styles.smallText}>{translateFromBackend(item, 'date')}</Text></View>
                  </View>
                </ScrollView>
              </View>
            </View>
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
  bgPrimary: {
    flex: 10,
    backgroundColor: Color.PRIMARY
  },
  detailsContainer: {
    marginVertical: '2%'
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    flex : 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  smallText:{
    flexDirection: 'column',
    fontSize: window.width >= 820 ? responsiveFontSize(1) : responsiveFontSize(1.6),
    lineHeight: responsiveHeight(3),
    fontFamily: 'Roboto',
    marginVertical: responsiveHeight(0.5)
  },
  itemTitle: {
    fontSize: window.width >= 820 ? 35 : responsiveFontSize(2.5),
    fontFamily: 'Roboto-Bold',
    lineHeight: window.width >= 768 ? 40 : 21,
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
    marginVertical: responsiveWidth(100) >= 768 ? 0 : '2%'
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
  scrollContainer: {
    height: responsiveHeight(25),
    alignItems: "center",
    justifyContent: "center"
  },
  scroll: {
    maxWidth: 800,
    width: responsiveWidth(100)
  },
  navIconsContainer: {
   height: 30,
   width: 30,
   position: 'absolute',
   bottom: 10,
   zIndex:1
   },
   navIcons: {
     height: 25,
     maxWidth: 30,
     resizeMode: 'contain'
   },
  scrollText: {
    marginVertical: responsiveWidth(100) > 820 ? '10%' : '3%',
    marginBottom: '10%'

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
    height: responsiveHeight(100) >= 768 ? responsiveHeight(30) : responsiveHeight(20),
    marginHorizontal: '4%',
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
    marginBottom: window.width > 820 ? '1%' : '3%',
    marginHorizontal: '4%',
  },
  sliderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  slider: {
    width:  responsiveWidth(100) > 820 ? responsiveWidth(30) : responsiveWidth(50),
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
    fontSize: responsiveWidth(100) >= 820 ? 20 : 14
  },
  audioController: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveWidth(100) >= 768 ? 0 : '2%',
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
      },
     android: {
       marginRight: '5%',
       backgroundColor: Color.SECONDARY,
     },
     default: {
       backgroundColor: Color.SECONDARY,
     }
   }),
 },
 track: {
   height: 3
  },
 buttonText: {
   color: Color.SECONDARY,
   fontSize: 12
 },
 leftRigth: {
   flexDirection: 'row'
 },
 audioContainer: {
   backgroundColor: '#FFF9F8',
   borderTopColor: Color.SECONDARY,
   borderBottomColor: 'transparent',
   borderLeftColor: 'transparent',
   borderRightColor: 'transparent',
   borderWidth: 2,
   paddingVertical: '3%',
   shadowColor: "#000",
   shadowOpacity: 0.25,
   shadowRadius: 2,
   shadowOffset: {
     height: 1,
     width: 1
   }
 },
   centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.BLACK,
  },
  modalView: {
    marginVertical: 150,
    backgroundColor: Color.BLACK,
    paddingVertical: 35,
    alignItems: 'flex-end'
  },
  button: {
    padding: '2%',
    margin: '2%'
  },
  buttonClose: {
    width: responsiveWidth(4),
    height: responsiveHeight(3)
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalImage: {
    flex: 1,
    resizeMode: 'contain',
    width: responsiveWidth(100),
    height: responsiveHeight(65),
  },
  imageContainer2: {
    width: responsiveWidth(98),
    height: responsiveHeight(65),
    alignItems: "center",
    justifyContent: "center"
  }
})

//---- Connect to props functions and values -----//
function mapStateToProps({items}) {
  return {items}
}

export default connect(mapStateToProps)(ItemScreen);
