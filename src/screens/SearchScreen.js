import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  ImageBackground,
  SafeAreaView
} from 'react-native';
import {
  responsiveFontSize
} from "react-native-responsive-dimensions";
import {
  setItems,
} from "../store/itemActions";
import { SearchBar } from 'react-native-elements';
import ItemPreview from "../components/atoms/ItemPreview";
import { Color, Font } from '../assets/styles/index.js';
import i18n from 'i18n-js';


class SearchResults extends Component {
    //setting default state
    state = {
      isLoading: false,
      search: '',
      arrayholder: []
    };

  clearSearch = () => {
    this.setState({isLoading: false, dataSource: [], search: ''})
  }

  searchFilterFunction(text) {
    this.setState({isLoading: true, dataSource: [], search: text})

    return fetch('https://fundaciongaselec.codepremium.es/api/items/search/'+text)
      .then(response => response.json())
      .then(responseJson => {
        // console.log('data from endpoint', responseJson);
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson,
          },
          function() {
            this.arrayholder = responseJson;
          }
        );
      })
      .catch(error => {
        console.error(error);
      });

    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      dataSource: newData,
      // search: text,
    });
  }

  ListViewItemSeparator = () => {
    //Item separator view
    return (
      <View
        style={{
          width: '100%',
        }}
      />
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.blackBackground}>
        <ImageBackground source={require('../assets/images/background.png')} style={styles.bg}>
          <View style={styles.mainContainer}>
            <View style={styles.viewStyle}>
              <SearchBar
                onChangeText={text => this.searchFilterFunction(text)}
                onClear={text => this.clearSearch('')}
                containerStyle={styles.searchBar}
                inputStyle={{fontFamily: 'Roboto', fontSize: responsiveFontSize(2) }}
                searchIcon={{ size: 24 }}
                containerStyle={styles.searchBar}
                inputStyle={{fontFamily: 'Roboto', fontSize: responsiveFontSize(2) }}
                searchIcon={{ size: 24 }}
                placeholder={i18n.t('searchScreen.searchLabel')}
                value={this.state.search}
              />
              { this.state.isLoading ?
                <View style={styles.spinner}>
                  <ActivityIndicator
                    color="#D99578"
                    size="large"  />
                </View>
              :
              <FlatList
                data={this.state.dataSource}
                ItemSeparatorComponent={this.ListViewItemSeparator}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
                   /* Elements that will render in the screen based on the users´s search*/
                   <ItemPreview
                     item={item}
                     isFullWidth={true}
                     onPress={()=>{ this.props.navigation.navigate('Item2', {
                       item,
                       panels: item.collection_panel,
                       floorName: item.collection_floor,
                       routeName: this.props.route.name}) }}
                       />
                )}
                enableEmptySections={true}
                keyExtractor={(item, index) => {index.toString()}}
                ListEmptyComponent={
                  <View style={styles.emptySearch}>
                    <Text style={styles.warningLabel}>{this.state.search == "" ? i18n.t('store.startSearch') : i18n.t('store.warning')}</Text>
                  </View>
                }
                />
              }
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
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
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    maxWidth: 800
  },
  viewStyle: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'transparent',
  },
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: Color.BLACK
  },
  searchBar: {
    backgroundColor: 'transparent',
    paddingHorizontal: 1
  },
  emptySearch:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: "100%",
    flexDirection: 'row',
  },
  warningLabel: {
    fontFamily: 'Roboto',
    fontSize: responsiveFontSize(2),
    color: Color.WHITE,
    padding: 5
  }
});

//---- Connect to props functions and values -----//

function mapStateToProps({items}) {
  return {items}
}

export default connect(mapStateToProps)(SearchResults);
