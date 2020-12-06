import React, { useEffect, useMemo, useState } from "react";
import {
  Animated,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableHighlight,
  FlatList,
  Dimensions
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  getMatchingEntries,
  setUpdate
} from "../../store/encyclopedia/actions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { EncyclopediaState } from "../../store/encyclopedia/types";
import { Button } from "react-native-paper";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
const mockList = ["Hello", "apple", "grapedd", "lao"];

const EncyclopediaSearchComponent = props => {
  const dispatch = useDispatch();
  const encyclopediaSearchResults = useSelector(
    (state: RootState) => state.encyclopedia.encyclopedia
  );
  const updateList = useSelector(
    (state: RootState) => state.encyclopedia.updatedList
  );
  const { clampedScroll } = props;
  const [textInputFocussed, setTextInputFocussed] = useState(false);
  const searchBarTranslate = clampedScroll.interpolate({
    inputRange: [0, 50],
    outputRange: [0, -250],
    extrapolate: "clamp"
  });
  const searchBarOpacity = clampedScroll.interpolate({
    inputRange: [0, 10],
    outputRange: [1, 0],
    extrapolate: "clamp"
  });
  const [searchTerm, setSearchTerm] = useState("");
  //const [temporarySearchResults, setTempSearchResults] = useState([]);

  function queryTemporarySearch() {
    dispatch(getMatchingEntries(searchTerm));
  }

  /*useEffect(() => {
        if (encyclopediaSearchResults != null) {
            setTempSearchResults(encyclopediaSearchResults.map(function state(state): EncyclopediaState {
                return state.name
            }));
            dispatch(setUpdate(false));
        }
    }, [updateList]);*/

  const handleBlur = () => {
    setTextInputFocussed(false);
    props.setSearchedTerm(searchTerm);
  };
  const renderSearchList = () => {
    return (
      <FlatList
        style={{ height: Math.floor(deviceHeight * 0.7) }}
        data={encyclopediaSearchResults}
        keyExtractor={item => item.url.split("/")[6]}
        renderItem={({ item }) => (
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={() => {
              console.log(item.url.split("/")[6]);
              props.navigation.navigate("EncyclopediaProfile", item);
            }}
          >
            <Text
              style={{
                padding: 10,
                fontSize: 20,
                borderBottomWidth: 2,
                borderColor: "black"
              }}
            >
              {item.name}
            </Text>
          </TouchableHighlight>
        )}
      />
    );
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            {
              translateY: searchBarTranslate
            }
          ],
          opacity: searchBarOpacity
        }
      ]}
    >
      <TextInput
        defaultValue={props.searchedTerm}
        placeholder="Search"
        style={styles.formField}
        placeholderTextColor={"#888888"}
        onFocus={() => setTextInputFocussed(true)}
        onBlur={handleBlur}
        onChange={event => setSearchTerm(event.nativeEvent.text)}
        returnKeyType="send"
        onSubmitEditing={() => queryTemporarySearch()}
      />
      {searchTerm.length > 0 && renderSearchList()}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 40,
    width: deviceWidth - 40,
    left: 20,
    zIndex: 99,
    backgroundColor: "white"
  },
  formField: {
    backgroundColor: "#F4F4F4",
    padding: 12,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 20,
    fontSize: 18,
    height: 50
  },
  searchList: {
    paddingLeft: 16
  },
  searchListItem: {
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    paddingRight: 16,
    borderColor: "#DBDBDB",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  searchListItemText: {
    fontSize: 20,
    maxWidth: "85%"
  }
});

export default EncyclopediaSearchComponent;
