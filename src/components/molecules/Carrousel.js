import React from 'react'
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

const  = (props) => {
  /* Slider Scroll */
  scrollX = new Animated.Value(0);
  return (
    {/* Image carrousel */}
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
      scrollEventThrottle={1}
        >
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
        </ScrollView>
        {/* Carrousel Indicators*/}
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
  )
}

export default
