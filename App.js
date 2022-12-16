import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Carousel from 'react-native-reanimated-carousel';

const dataArray = [
  {
    title: 'location1',
    coordinate: {
      latitude: 29.549206203666728,
      longitude: 82.53719197417547,
      latitudeDelta: 0.09,
      longitudeDelta: 0.04,
    },
  },
  {
    title: 'location2',
    coordinate: {
      latitude: 13.277518256087603,
      longitude: 82.72987526648319,
      latitudeDelta: 0.09,
      longitudeDelta: 0.04,
    },
  },
  {
    title: 'location3',
    coordinate: {
      latitude: 28.105041682617767,
      longitude: 72.60329746629958,
      latitudeDelta: 0.09,
      longitudeDelta: 0.04,
    },
  },
  {
    title: 'location4',
    coordinate: {
      latitude: 38.52635750095072,
      longitude: 77.74151859450467,
      latitudeDelta: 0.09,
      longitudeDelta: 0.04,
    },
  },
  {
    title: 'location5',
    coordinate: {
      latitude: 22.969035732335257,
      longitude: 76.15723440000016,
      latitudeDelta: 0.09,
      longitudeDelta: 0.04,
    },
  },
  {
    title: 'location6',
    coordinate: {
      latitude: 21.14363534043052,
      longitude: 72.64611630238059,
      latitudeDelta: 0.09,
      longitudeDelta: 0.04,
    },
  },
  {
    title: 'location7',
    coordinate: {
      latitude: 25.776817240546634,
      longitude: 85.87703570750881,
      latitudeDelta: 0.09,
      longitudeDelta: 0.04,
    },
  },
  {
    title: 'location8',
    coordinate: {
      latitude: 22.09895954930313,
      longitude: 89.36674389706883,
      latitudeDelta: 0.09,
      longitudeDelta: 0.04,
    },
  },
];

const {width, height} = Dimensions.get('window');

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

const App = () => {
  // const images = [
  //   {
  //     image: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4',
  //   },
  //   {
  //     image: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4',
  //   },
  //   {
  //     image: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4',
  //   },
  //   {
  //     image: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4',
  //   },
  //   {
  //     image: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4',
  //   },
  // ];

  // const {width: windowWidth} = useWindowDimensions();
  const animatedValue = useRef(new Animated.Value(0)).current;

  const [position, setPosition] = useState({
    latitude: 10,
    longitude: 10,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

  const [marker, setMarker] = useState([]);
  const [scrollIndex, setScrollIndex] = useState(0);

  const runAnimation = () => {
    Animated.spring(animatedValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const flatListRef = useRef(null);
  const handleScroll = event => {
    let index = Math.ceil(event.nativeEvent.contentOffset.x / 190);
    setScrollIndex(index);
  };

  const onMapPress = e => {
    let markerArray = [];
    markerArray.push({coordinate: e.nativeEvent.coordinate});
    // console.log('markerArray', markerArray);
    setMarker(m => [...m, markerArray]);
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(pos => {
      const crd = pos.coords;
      setPosition({
        latitude: crd.latitude,
        longitude: crd.longitude,
        latitudeDelta: 0.09,
        longitudeDelta: 0.04,
      });
    });
  }, []);

  return (
    <View style={{flex: 1}}>
      <MapView
        coordinate={position}
        style={{flex: 1}}
        showsUserLocation={true}
        region={dataArray[scrollIndex].coordinate}
        // animatedValue={}
        // onPress={onMapPress.bind(this)}>
      >
        {dataArray.length !== 0 &&
          dataArray.map((item, index) => {
            console.log(scrollIndex, index);
            return (
              <Marker coordinate={item.coordinate} key={index}>
                <Animated.View style={[styles.markerWrap]}>
                  {scrollIndex == index ? (
                    <Image
                      source={require('./src/asset/mark.png')}
                      style={{height: 20, width: 20}}
                    />
                  ) : (
                    <Image
                      source={require('./src/asset/unmark1.png')}
                      style={{height: 20, width: 20}}
                    />
                  )}
                </Animated.View>
              </Marker>
            );
          })}
      </MapView>

      {/* <Animated.ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: animatedValue,
                },
              },
            },
          ],
          {useNativeDriver: true},
        )}
        style={styles.scrollView}
        contentContainerStyle={styles.endPadding}>
        {dataArray.map((marker, index) => (
          <View style={styles.card} key={index}>
            <View style={styles.textContent}>
              <Text numberOfLines={1} style={styles.cardtitle}>
                {marker.title}
              </Text>
            </View>
          </View>
        ))}
      </Animated.ScrollView> */}
      <View style={{position: 'absolute', bottom: 20, marginHorizontal: 20}}>
        {/* <Carousel
          // loop
          // width={width}
          // height={width / 2}
          // autoPlay={true}
          data={dataArray}
          scrollAnimationDuration={1000}
          // onSnapToItem={index => console.log('current index:', index)}
          renderItem={({item}) => {
            return (
              <View style={{backgroundColor: 'red'}}>
                <Text
                  style={{
                    fontSize: 20,
                    marginHorizontal: 30,
                    marginVertical: 20,
                    color: 'white',
                  }}>
                  {item.title}
                </Text>
              </View>
            );
          }}
        /> */}
        <FlatList
          ref={flatListRef}
          data={dataArray}
          horizontal={true}
          // pagingEnabled={true}
          ItemSeparatorComponent={() => {
            return <View style={{width: 10}} />;
          }}
          onScroll={handleScroll}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            console.log('index', index);
            return (
              <View style={{backgroundColor: 'yellow'}}>
                <Text
                  style={{
                    fontSize: 20,
                    marginHorizontal: 50,
                    marginVertical: 20,
                    color: 'white',
                  }}>
                  {item.title}
                </Text>
              </View>
            );
          }}
        />
      </View>
    </View>

    /* <View
        style={{
          height: 500,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Animated.ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ])}
          scrollEventThrottle={1}>
          {images.map((item, index) => {
            console.log('item', item);
            return (
              <View
                style={{
                  width: windowWidth,
                  height: 500,
                }}
                key={index}>
                <Image
                  source={{uri: item.image}}
                  style={{
                    flex: 1,
                    marginVertical: 4,
                    marginHorizontal: 16,
                    borderRadius: 5,
                    overflow: 'hidden',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                />
              </View>
            );
          })}
        </Animated.ScrollView>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {images.map((item, index) => {
            const width = scrollX.interpolate({
              inputRange: [
                windowWidth * (index - 1),
                windowWidth * index,
                windowWidth * (index + 1),
              ],
              // outputRange: ['#00aaFF', '#808080', '#00aaFF'],
              outputRange: [10, 20, 10],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View key={index} style={[styles.dotStyle, {width}]} />
            );
          })}
        </View>
      </View> */
    /* <Animated.View
        style={{
          height: 200,
          width: 200,
          backgroundColor: 'yellow',
          transform: [
            {
              scale: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 2],
              }),
            },
          ],
        }}
      />
      <TouchableOpacity
        onPress={() => {
          runAnimation();
        }}
        style={{
          height: 30,
          width: '100%',
          backgroundColor: 'blue',
          justifyContent: 'center',
          marginTop: 30,
        }}>
        <Text style={{color: 'white', alignSelf: 'center', fontSize: 20}}>
          Start Animation
        </Text>
      </TouchableOpacity> */
  );
};

export default App;

const styles = StyleSheet.create({
  dotStyle: {
    height: 8,
    borderRadius: 4,
    backgroundColor: 'blue',
    marginHorizontal: 4,
    marginTop: 10,
  },
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(130,4,150, 0.9)',
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(130,4,150, 0.3)',
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(130,4,150, 0.5)',
  },
  scrollView: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: 10,
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: '#FFF',
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: {x: 2, y: -2},
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: 'hidden',
  },
});
