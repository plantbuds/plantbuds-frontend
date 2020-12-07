import { HeaderBackButton } from '@react-navigation/stack';
import { removePushTokenSubscription } from 'expo-notifications';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Dimensions, Image } from 'react-native';
import { Button, Divider, Headline, Subheading, Text, Title } from 'react-native-paper';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useDispatch } from 'react-redux';

// declare types for your props here
interface Props {
  navigation: any;
  route: any;
  item: any;
}

export default function EncyclopediaProfileScreen(props: Props) {
  const { navigation, route } = props;
  const dispatch = useDispatch();

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

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: 'Back'
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ flexDirection: 'row' }}>
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
          <Headline style={styles.title}>{route.params.name}</Headline>
        </View>

        <Title style={styles.sectionTitle}>Scientific Classification</Title>

        <View style={styles.rowStyling}>
          <Subheading style={styles.sectionSubTitle}>Family</Subheading>
          <Text style={styles.sectionContent}>{route.params.family}</Text>
        </View>
        <Divider />
        <View style={styles.rowStyling}>
          <Subheading style={styles.sectionSubTitle}>Genus</Subheading>
          <Text style={styles.sectionContent}>{route.params.genus}</Text>
        </View>
        <Divider />
        <View style={styles.rowStyling}>
          <Subheading style={styles.sectionSubTitle}>Species</Subheading>
          <Text style={styles.sectionContent}>{route.params.species}</Text>
        </View>

        <Title style={styles.sectionTitle}>Care</Title>


        <View style={styles.rowStyling}>
          <Subheading style={styles.sectionSubTitle}>Water Requirements</Subheading>
          <Text style={styles.sectionContent}>{parseStringArray(route.params.water)}</Text>
        </View>
        <Divider />
        <View style={styles.rowStyling}>
          <Subheading style={styles.sectionSubTitle}>Sun Exposure</Subheading>
          <Text style={styles.sectionContent}>{parseStringArray(route.params.sun)}</Text>
        </View>
        <Divider />
        <View style={styles.rowStyling}>
          <Subheading style={styles.sectionSubTitle}>Hardiness</Subheading>
          <Text style={styles.sectionContent}>{parseStringArray(route.params.hardiness)}</Text>
        </View>
        <Divider />
        {/* <View style={styles.rowStyling}>
          <Text style={styles.infoTitleStyle}>Soil pH Requirements</Text>
          <Text style={styles.infoFieldStyle}># pH - # pH</Text>
        </View> */}
        <View style={styles.rowStyling}>
          <Subheading style={styles.sectionSubTitle}>Propagation</Subheading>
          <Text style={styles.sectionContent}>{parseStringArray(route.params.propagation)}</Text>
        </View>
        <Divider />

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
          <Subheading style={styles.sectionSubTitle}>Where to Grow</Subheading>
          <Text style={styles.sectionContent}>{parseStringArray(route.params.where_to_grow)}</Text>
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
    backgroundColor: '#fff',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 20,
  },
  title: {
    alignContent: 'center',
    alignSelf: 'center',
    width: windowWidth * 0.51,
    marginTop: 10,
    marginLeft: 10
  },
  sectionTitle: {
    paddingTop: 10,
    paddingBottom: 5,
  },
  sectionSubTitle: {
    width: windowWidth * 0.4,
  },
  sectionContent: {
    paddingTop: 5,
    textAlign: 'left',
    width: windowWidth * 0.45,
  },
  rowStyling: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: windowWidth * 0.85
  },
  containerPicture: {
    backgroundColor: '#fff',
    paddingTop: 10,
  },
  profilePicture: {
    borderColor: Colors.grey300,
    width: 150,
    height: 150,
    marginTop: 15,
    borderRadius: 100,
    borderWidth: 2,
  },
});
