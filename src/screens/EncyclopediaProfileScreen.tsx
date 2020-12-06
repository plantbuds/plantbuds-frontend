import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions, Image } from "react-native";
import { Button } from "react-native-paper";

// declare types for your props here
interface Props {
  navigation: any;
  route:any;
  name:string;
}

export default function TestScreen(props: Props) {
  const { navigation,route } = props;

  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(route.params)}</Text>
      <View style={{ flexDirection: "row" }}>
        <Button
          labelStyle={styles.searchButtonStyle}
          onPress={() => navigation.navigate("Search")}
        >
          Back to Search
        </Button>
      </View>
  
      <ScrollView>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "column" }}>
            <View style={styles.containerPicture}>
              <Image
                style={styles.profilePicture}
                source={{
                  uri: 'https://cse.ucsd.edu/sites/cse.ucsd.edu/files/faculty/gillespie17M-115x150.jpg', 
                }}
              />  
            </View>
          </View>
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.speciesNameStyle}>Species</Text>
            <Text style={styles.commonNameStyle}>Common Name</Text>
          </View>
        </View>
        
        <View style={{paddingTop: 20}}>
          <Text style={styles.parentTitleStyle}>Description</Text>
          <Text style={styles.descriptionStyle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
        </View>  

        <View style={{paddingTop: 10}}>
          <Text style={styles.parentTitleStyle}>Scientific Classification</Text>
        </View> 

        <View style={styles.rowStyling}>
          <Text style={styles.infoTitleStyle}>Family</Text>
          <Text style={styles.infoFieldStyle}>Family Name</Text>
        </View>
        <View style={styles.rowStyling}>
          <Text style={styles.infoTitleStyle}>Genus</Text>
          <Text style={styles.infoFieldStyle}>Genus Name</Text>
        </View>
        <View style={styles.rowStyling}>
          <Text style={styles.infoTitleStyle}>Species</Text>
          <Text style={styles.infoFieldStyle}>Species Name</Text>
        </View>

        <View style={{paddingTop: 10}}>
          <Text style={styles.parentTitleStyle}>Plant Care</Text>
        </View> 

        <View style={styles.rowStyling}>
          <Text style={styles.infoTitleStyle}>Water Requirements</Text>
          <Text style={styles.infoFieldStyle}># per time</Text>
        </View>
        <View style={styles.rowStyling}>
          <Text style={styles.infoTitleStyle}>Sun Exposure</Text>
          <Text style={styles.infoFieldStyle}>Direct/Shade/None</Text>
        </View>
        <View style={styles.rowStyling}>
          <Text style={styles.infoTitleStyle}>Hardiness</Text>
          <Text style={styles.infoFieldStyle}>Hardiness Rating</Text>
        </View>
        <View style={styles.rowStyling}>
          <Text style={styles.infoTitleStyle}>Soil pH Requirements</Text>
          <Text style={styles.infoFieldStyle}># pH - # pH</Text>
        </View>
        <View style={styles.rowStyling}>
          <Text style={styles.infoTitleStyle}>Propagation</Text>
          <Text style={styles.infoFieldStyle}>Method 1,2,3</Text>
        </View>
        <View style={styles.rowStyling}>
          <Text style={styles.infoTitleStyle}>Seed Collection</Text>
          <Text style={styles.infoFieldStyle}>Y/N/How?</Text>
        </View>
          
        <View style={{paddingTop: 10}}>
          <Text style={styles.parentTitleStyle}>FAQs</Text>
        </View> 

        <View style={styles.rowStyling}>
          <Text style={styles.infoTitleStyle}>Seed Collection</Text>
        </View>
        <View>
        <Text style={styles.textStyle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</Text>
        </View>

        <View style={styles.rowStyling}>
          <Text style={styles.infoTitleStyle}>Where to Grow</Text>
        </View>
        <View>
          <Text style={styles.textStyle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</Text>
        </View>

        <View style={styles.rowStyling}>
          <Text style={styles.infoTitleStyle}>Regions</Text>
        </View>
        <View>
          <Text style={styles.textStyle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</Text>
        </View>

        <View style={styles.rowStyling}>
          <Text style={styles.infoTitleStyle}>Dangers</Text>
        </View >
        <View style={{paddingBottom: 20}}>
          <Text style={styles.textStyle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</Text>
        </View>

      </ScrollView>
    </View>
  );
}
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    backgroundColor: "#fff",
    //alignItems: "center",
    //justifyContent: "center"
  },

  buttonText: {
    color: "white"
  },

  innerButton: {
    padding: 10
  },

  button: {
    borderRadius: 50
  },

  containerPicture: {
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 10,
    height: windowHeight * 0.23,
    marginLeft: 20
  },

  profilePicture: {
    flexDirection: "column",
    borderColor: "black",
    width: 150,
    height: 150,
    borderRadius: 100
  },

  speciesNameStyle: {
    alignContent: "center",
    top: "30%",
    fontSize: 36,
    marginLeft: 10,
    fontStyle: "normal",
    fontWeight: "normal",
    color: "#000",
    paddingBottom: 3
  },

  commonNameStyle: {
    alignContent: "center",
    top: "30%",
    fontSize: 24,
    marginLeft: 10,
    fontStyle: "normal",
    fontWeight: "normal",
    color: "#959695",
    paddingBottom: 3
  },

  parentTitleStyle: {
    marginLeft: 20,
    fontStyle: "normal",
    fontWeight: "normal",
    color: "#000",
    fontSize: 20,
    lineHeight: 30,
    paddingTop: 10,
    paddingBottom: 5
    //justifyContent: "space-around"
  },

  descriptionStyle: {
    fontStyle: "normal",
    fontWeight: "normal",
    color: "#959695",
    fontSize: 16,
    lineHeight: 30,
    marginLeft: 20,
    marginRight: 20
  },

  textStyle: {
    fontStyle: "normal",
    fontWeight: "normal",
    color: "#666666",
    fontSize: 12,
    lineHeight: 30,
    marginLeft: 20,
    marginRight: 20
  },

  rowStyling: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 20,
    marginRight: 20
    //alignSelf: "center",
    //width: windowWidth * 0.78
  },

  infoTitleStyle: {
    fontStyle: "normal",
    fontWeight: "normal",
    color: "#666666",
    fontSize: 16,
    lineHeight: 30
  },

  infoFieldStyle: {
    fontStyle: "normal",
    fontWeight: "normal",
    color: "#959695",
    fontSize: 16,
    lineHeight: 30
  },

  buttonStyle: {
    width: 60,
    height: 15,
    fontSize: 10,
    textTransform: "none",
    color: "#64A3A3",
    fontStyle: "normal",
    fontWeight: "normal"
  },

  searchButtonStyle: {
    borderRadius: 1,
    fontSize: 18,
    textTransform: "none",
    color: "#64A3A3",
    fontStyle: "normal",
    fontWeight: "normal"
  }

});
