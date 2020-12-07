import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import {
  Subheading,
  ActivityIndicator,
  Colors,
  Divider,
  Headline,
  Searchbar,
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getMatchingEntries } from '../../store/encyclopedia/actions';
import { RootState } from '../../store/store';

interface Props {
  navigation: any;
}

export default function EncyclopediaSearchScreen(props: Props) {
  const { navigation } = props;
  const encyclopediaSearchResults = useSelector(
    (state: RootState) => state.encyclopedia.encyclopedia
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [didSearch, setDidSearch] = useState(false);

  const dispatch = useDispatch();
  const search = async () => {
    await dispatch(getMatchingEntries(searchQuery));
  };

  const onChangeSearch = (query: string) => {
    setDidSearch(false);
    setSearchQuery(query);
  };

  async function searchEncyclopedia() {
    setLoading(true);
    await search();
    setDidSearch(true);
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Searchbar
            keyboardType='ascii-capable'
            style={styles.searchBar}
            placeholder='Search the encyclopedia'
            onChangeText={onChangeSearch}
            onSubmitEditing={() => searchEncyclopedia()}
            value={searchQuery}
          />
          <ActivityIndicator
            style={styles.center}
            animating={loading}
            color={Colors.lightGreen900}
          />
          <View style={styles.resultsContainer}>
            {
            encyclopediaSearchResults.length > 0 && 
            loading === false && 
            didSearch === true &&
              <FlatList
                data={encyclopediaSearchResults}
                keyExtractor={item => item.url.split('/')[6]}
                renderItem={({ item }) => (
                  <TouchableHighlight
                    style={{ borderRadius: 1, borderColor: Colors.grey300 }}
                    key={item.key}
                    activeOpacity={0.6}
                    underlayColor={Colors.grey100}
                    onPress={() => {
                      console.log(item.url.split('/')[6]);
                      navigation.navigate('EncyclopediaProfile', item);
                    }}
                  >
                    <View>
                      <Subheading style={{ padding: 10 }}>
                        {item.name}
                      </Subheading>
                      <Divider />
                    </View>
                  </TouchableHighlight>
                )}
              />
            }
            {encyclopediaSearchResults.length === 0 && didSearch === true &&
              <Headline style={{ paddingTop: 25, textAlign: 'center' }}>
                Oops! We didn't find any plants with that name.
              </Headline>
            }
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 15
  },
  searchBar: {
    borderColor: Colors.grey300,
    backgroundColor: Colors.grey50,
    borderWidth: 2,
    borderRadius: 30,
    shadowOpacity: 0,
    width: windowWidth * 0.85,
    height: windowHeight * 0.06,
  },
  resultsContainer: {
    width: windowWidth * 0.85
  },
  center: {
    position: 'absolute',
    marginTop: windowHeight * 0.45
  }
});
