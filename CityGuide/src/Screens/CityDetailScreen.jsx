import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, FlatList, ScrollView, Platform, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { HeartIcon } from 'react-native-heroicons/solid'
import { useState, useEffect } from 'react'
import Carousel from 'react-native-reanimated-carousel';
import MapView, { Marker } from 'react-native-maps';
import { Linking } from 'react-native'
import { fetchCityData } from '../NetworkManager/NetworkManager'
import Loader from '../Components/Loader'
import { updateCityListLikeData } from '../Redux/Slice/CityListSlice'
import { useDispatch, useSelector } from 'react-redux'

const { width, height } = Dimensions.get('window');

const CityDetailScreen = ({ route }) => {
    // Get Passed Data
    const { cityData, isLiked } = route.params
    const [isLikedLocal, setIsLikedLocal] = useState(isLiked)
    const navigation = useNavigation();
    const [cityDetails, setCityDetails] = useState({})
    const [coordinate, setCoordinates] = useState({
        latitude: 0,
        longitude: 0
    })
    const [currentIndex, setCurrentIndex] = useState(0);
    const [placesData, setPlaceData] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const cityListStoreVal = useSelector((state) => state.cityListState)

    const showComingSoonAlert = () => {
        Alert.alert('Alert', 'Feature Coming Soon')
    }

    const openLink = (link) => {
        const url = link
        Linking.openURL(url).catch(err => Alert.alert('Error', 'Error Opening Browser'))
    }

    const logStoreCityList = () => {
        // console.log("cityListStoreVal START:------------ ")
        // console.log(cityListStoreVal)
        // console.log("cityListStoreVal END:------------ ")
    }

    const toggleLikeForCity = () => {
        logStoreCityList()
        // Update UI
        let toggleFav = !isLikedLocal
        setIsLikedLocal(toggleFav)
        console.log(`Toggle isLiked for cityID: ${cityData.id}`)
        dispatch(updateCityListLikeData({id: cityData.id, isLiked: toggleFav}))
    }

    useEffect(() => {
        logStoreCityList()
    }, [cityListStoreVal])

    const fetchCityDetail = async () => {
        const data = await fetchCityData(cityData.name);
        setTimeout(() => {
            setLoading(false);
            console.log('Complete: ', data[0])
            if (Array.isArray(data)) {
                setCityDetails(data[0]);
            } else {
                Alert.alert('Error', `Fetched data is not an array: ${data}`)
            }
        }, 1000)
    }

    // Update Local params after getting city details
    useEffect(() => {
        if (cityDetails && cityDetails.latitude && cityDetails.longitude) {
            setCoordinates({
                latitude: cityDetails.latitude,
                longitude: cityDetails.longitude,
            });
        }

        if (cityDetails && cityDetails.places) {
            setPlaceData(cityDetails.places)
        }

    }, [cityDetails]);  // This effect will run whenever cityDetails is updated

    useEffect(() => {
        //console.log('Inside Details Screen')
        setLoading(true);
        fetchCityDetail();
    }, [])

    const renderPlaces = (place) => {
        //console.log(`Render PlaceData = ${placesData}`)
        // console.log(`Render Place = ${place}`)
        //console.log(JSON.stringify(place, null, 2));
        return (
            <View style={styles.placeContainer}>
                <View style={{ overflow: 'hidden' }}>
                    <View style={styles.placeTitleView}>
                        <Text style={{ fontSize: 20, marginLeft: 10, fontWeight: 'bold' }}>{place.item.name}</Text>
                        <Text style={{ fontSize: 18, marginRight: 10, fontWeight: '600' }}>{place.item.distance_from_city_center_km} Km</Text>
                    </View>
                    <Text style={{ marginHorizontal: 10 }} numberOfLines={10} ellipsizeMode="tail" >
                        {place.item.description}
                    </Text>
                    <TouchableOpacity onPress={() => openLink(place.item.wikipedia_link)} style={{ marginLeft: 10, marginTop: 10 }}>
                        <View>
                            <Text style={styles.link}>Read more</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <View style={styles.placeButtonView}>
                        <TouchableOpacity style={styles.placeButtons} onPress={showComingSoonAlert}>
                            <View style={styles.button}>
                                <Image
                                    source={require('../Images/icon_direction.png')}
                                    style={styles.icons}
                                />
                                <Text>
                                    Directions
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.placeButtons} onPress={showComingSoonAlert}>
                            <View style={styles.button}>
                                <Image
                                    source={require('../Images/icon_cab.png')}
                                    style={styles.icons}
                                />
                                <Text>
                                    Book Uber
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Image
                            source={require('../Images/HawaMahal1.jpeg')}
                            style={styles.placeImages}
                        />
                        <Image
                            source={require('../Images/HawaMahal2.jpeg')}
                            style={styles.placeImages}
                        />
                        <Image
                            source={require('../Images/HawaMahal3.jpeg')}
                            style={styles.placeImages}
                        />
                    </View>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* Navigation View */}
            <View style={styles.viewNavigation}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../Images/icon_back.png')}
                        style={styles.iconBack}
                    />
                </TouchableOpacity>
                <Text style={styles.title}>{cityData.name}</Text>
                <TouchableOpacity onPress={toggleLikeForCity}>
                    <HeartIcon
                        size="35"
                        color={isLikedLocal ? 'red' : 'lightgray'}
                    />
                </TouchableOpacity>
            </View>
            {
                loading ?
                    (
                        <Loader />
                    )
                    :
                    (
                        <View style={{ flex: 1 }}>
                            {/* MapView */}
                            <View style={styles.mapView}>
                                <MapView
                                    style={styles.map}
                                    region={{
                                        latitude: coordinate.latitude,
                                        longitude: coordinate.longitude,
                                        latitudeDelta: 0.07,  // zoom level
                                        longitudeDelta: 0.07, // zoom level
                                    }}
                                    mapType="standard"
                                    onLayout={() => console.log('MapView Rendered')}
                                >
                                    {/* Add a marker on the map */}
                                    <Marker
                                        key="marker-1"
                                        coordinate={coordinate}
                                        title={cityDetails.name}
                                        description={`This is ${cityDetails.name} City !!`}
                                        pinColor="red"
                                        style={{ zIndex: 999 }}
                                    />
                                </MapView>
                            </View>
                            {/* Page Control */}
                            <View style={styles.pageControlView}>
                                {
                                    placesData.map((_, index) => (
                                        <View
                                            key={index}
                                            style={[
                                                styles.dot,
                                                currentIndex === index ? styles.activeDot : styles.inactiveDot,
                                            ]}
                                        >
                                        </View>
                                    ))
                                }
                            </View>
                            {/* Places Details */}
                            <View style={styles.placeView}>
                                <Carousel
                                    loop
                                    // autoPlay
                                    style={{
                                        width: "100%",
                                        justifyContent: "flex-start",
                                        alignItems: "center",
                                    }}
                                    width={width * 0.85}
                                    // height={56}
                                    data={placesData}
                                    //scrollAnimationDuration={1500}
                                    renderItem={renderPlaces}
                                    onSnapToItem={(index) => setCurrentIndex(index)}
                                />
                            </View>
                        </View>
                    )
            }
        </SafeAreaView>
    )
}

export default CityDetailScreen

const styles = StyleSheet.create({
    viewNavigation: {
        paddingHorizontal: 12,
        paddingVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    iconBack: {
        width: 25,
        height: 25
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    mapView: {
        height: height * 0.3,
        //backgroundColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'gray',
        borderWidth: 1
    },
    placeView: {
        flex: 1,
        marginBottom: Platform.OS === 'ios' ? 5 : 20,
    },
    cardList: {
        paddingLeft: 20,
    },
    card: {
        width: width * 0.7,
        height: height * 0.35,
        marginRight: 15,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 1,
    },
    placeContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 8,
        borderColor: 'gray',
        borderWidth: 1,
        overflow: 'hidden'
    },
    placeTitleView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        width: '100%',
    },
    icons: {
        width: 30,
        height: 30,
        marginRight: 4
    },
    placeButtonView: {
        width: '100%',
        paddingVertical: 10,
        flexDirection: 'row',
    },
    placeButtons: {
        width: width * 0.3,
        marginHorizontal: '10',
        paddingHorizontal: 10,
        borderColor: 'gray',
        borderWidth: 2,
        borderRadius: 10,
        alignItems: 'center',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    placeImages: {
        height: height * 0.1,
        width: width * 0.22,
        marginHorizontal: 5,
        borderRadius: 10,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 5
    },
    map: {
        width: '100%',
        height: '100%'
    },
    dotStyle: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'blue', // Active dot color
    },
    inactiveDotStyle: {
        backgroundColor: 'gray', // Inactive dot color
    },
    pageControlView: {
        height: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    dot: {
        width: 8,
        height: 8,
        backgroundColor: 'red',
        marginHorizontal: 4,
        borderRadius: 4
    },
    activeDot: {
        backgroundColor: '#007BFF'
    },
    inactiveDot: {
        backgroundColor: '#D3D3D3'
    },
    link: {
        color: 'blue',
        textDecorationLine: 'underline',
    }
})