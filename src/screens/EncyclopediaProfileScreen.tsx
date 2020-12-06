import {removePushTokenSubscription} from 'expo-notifications';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView, Dimensions, Image} from 'react-native';
import {Button} from 'react-native-paper';

// declare types for your props here
interface Props {
  navigation: any;
  route: any;
  item: any;
}

export default function EncyclopediaProfileScreen(props: Props) {
  const {navigation, route} = props;

  const defaultPlant = 'http://i.imgur.com/4os1ZjY.png';

  function parseStringArray(s: string[]) {
    let parsedString = '';

    if (s === null) return 'Unknown';

    for (let i = 0; i < s.length; i++) {
      s[i] = s[i].replace(/'/g, '');

      if (s[i] === 'Unknown - Tell us') {
        parsedString += 'Unknown\n';
      } else if (s[i] === 'Not Applicable') {
        continue;
      } else if (s[i] === 'Average Water Needs') {
        continue;
      } else {
        let stringCapitalized = s[i].charAt(0).toUpperCase() + s[i].slice(1);

        parsedString = parsedString + '• ' + stringCapitalized + '\n';
      }
    }

    return parsedString;
  }

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Button labelStyle={styles.searchButtonStyle} onPress={() => navigation.navigate('Search')}>
          Back to Search
        </Button>
      </View>

      <ScrollView>
        <View style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'column'}}>
            <View style={styles.containerPicture}>
              <Image
                style={styles.profilePicture}
                source={{
                  uri: route.params.img
                    ? 'https://davesgarden.com' +
                      route.params.img.split('&')[0] +
                      '&width=150&height=150'
                    : defaultPlant,
                }}
              />
            </View>
          </View>
          <View style={{flexDirection: 'column'}}>
            <Text style={styles.speciesNameStyle}>
              {route.params.species ? route.params.species : ''}
            </Text>
            <Text style={styles.commonNameStyle}>{route.params.name}</Text>
          </View>
        </View>

        {/* <View style={{ paddingTop: 20 }}>
          <Text style={styles.parentTitleStyle}>Description</Text>
          <Text style={styles.descriptionStyle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </View> */}

        <View style={{paddingTop: 10}}>
          <Text style={styles.parentTitleStyle}>Scientific Classification</Text>
        </View>

        <View style={styles.rowStyling}>
          <Text style={styles.infoTitleStyle}>Family</Text>
          <Text style={styles.infoFieldStyle}>{route.params.family}</Text>
        </View>
        <View style={styles.rowStyling}>
          <Text style={styles.infoTitleStyle}>Genus</Text>
          <Text style={styles.infoFieldStyle}>{route.params.genus}</Text>
        </View>
        <View style={styles.rowStyling}>
          <Text style={styles.infoTitleStyle}>Species</Text>
          <Text style={styles.infoFieldStyle}>{route.params.species}</Text>
        </View>

        <View style={{paddingTop: 10}}>
          <Text style={styles.parentTitleStyle}>Plant Care</Text>
        </View>

        <View style={styles.rowStyling}>
          <Text style={styles.infoTitleStyle}>Water Requirements</Text>
          <Text style={styles.infoFieldStyle}>{parseStringArray(route.params.water)}</Text>
        </View>
        <View style={styles.rowStyling}>
          <Text style={styles.infoTitleStyle}>Sun Exposure</Text>
          <Text style={styles.infoFieldStyle}>{parseStringArray(route.params.sun)}</Text>
        </View>
        <View style={styles.rowStyling}>
          <Text style={styles.infoTitleStyle}>Hardiness</Text>
          <Text style={styles.infoFieldStyle}>{parseStringArray(route.params.hardiness)}</Text>
        </View>
        {/* <View style={styles.rowStyling}>
          <Text style={styles.infoTitleStyle}>Soil pH Requirements</Text>
          <Text style={styles.infoFieldStyle}># pH - # pH</Text>
        </View> */}
        <View style={styles.rowStyling}>
          <Text style={styles.infoTitleStyle}>Propagation</Text>
          <Text style={styles.infoFieldStyle}>{parseStringArray(route.params.propagation)}</Text>
        </View>

        {/* <View style={{ paddingTop: 10 }}>
          <Text style={styles.parentTitleStyle}>FAQs</Text>
        </View> */}

        {/* <View style={styles.rowStyling}>
          <Text style={styles.infoTitleStyle}>Seed Collection</Text>
        </View>
        <View>
          <Text style={styles.textStyle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </Text>
        </View> */}

        <View style={styles.rowStyling}>
          <Text style={styles.infoTitleStyle}>Where to Grow</Text>
          <Text style={styles.infoFieldStyle}>{parseStringArray(route.params.where_to_grow)}</Text>
        </View>

        {/* <View style={styles.rowStyling}>
          <Text style={styles.infoTitleStyle}>Regions</Text>
        </View>
        <View>
          <Text style={styles.textStyle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </Text>
        </View>

        <View style={styles.rowStyling}>
          <Text style={styles.infoTitleStyle}>Dangers</Text>
        </View>
        <View style={{ paddingBottom: 20 }}>
          <Text style={styles.textStyle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </Text>
        </View> */}
      </ScrollView>
    </View>
  );
}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: '#fff',
    //alignItems: "center",
    //justifyContent: "center"
  },

  buttonText: {
    color: 'white',
  },

  innerButton: {
    padding: 10,
  },

  button: {
    borderRadius: 50,
  },

  containerPicture: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 10,
    height: windowHeight * 0.23,
    marginLeft: 20,
  },

  profilePicture: {
    flexDirection: 'column',
    borderColor: 'black',
    width: 150,
    height: 150,
    borderRadius: 100,
  },

  speciesNameStyle: {
    alignContent: 'center',
    top: 0,
    fontSize: 36,
    marginLeft: 10,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: '#000',
    paddingBottom: 0,
    width: windowWidth * 0.51,
  },

  commonNameStyle: {
    alignContent: 'center',
    top: 0,
    fontSize: 24,
    marginLeft: 10,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: '#959695',
    paddingBottom: 0,
    width: windowWidth * 0.5,
  },

  parentTitleStyle: {
    marginLeft: 20,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: '#000',
    fontSize: 20,
    lineHeight: 30,
    paddingTop: 10,
    paddingBottom: 5,
    //justifyContent: "space-around"
  },

  descriptionStyle: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: '#959695',
    fontSize: 16,
    lineHeight: 30,
    marginLeft: 20,
    marginRight: 20,
  },

  textStyle: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: '#666666',
    fontSize: 12,
    lineHeight: 30,
    marginLeft: 20,
    marginRight: 20,
  },

  rowStyling: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 20,
    //alignSelf: "center",
    //width: windowWidth * 0.78
  },

  infoTitleStyle: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: '#666666',
    fontSize: 16,
    lineHeight: 30,
    width: windowWidth * 0.4,
  },

  infoFieldStyle: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: '#959695',
    fontSize: 16,
    lineHeight: 25,
    textAlign: 'left',
    width: windowWidth * 0.45,
  },

  buttonStyle: {
    width: 60,
    height: 15,
    fontSize: 10,
    textTransform: 'none',
    color: '#64A3A3',
    fontStyle: 'normal',
    fontWeight: 'normal',
  },

  searchButtonStyle: {
    borderRadius: 1,
    fontSize: 18,
    textTransform: 'none',
    color: '#64A3A3',
    fontStyle: 'normal',
    fontWeight: 'normal',
  },
});
