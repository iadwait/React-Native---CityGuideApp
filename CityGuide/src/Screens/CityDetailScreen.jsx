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

const { width, height } = Dimensions.get('window');

const CityDetailScreen = ({ route }) => {
    // Get Passed Data
    const { cityData } = route.params
    const navigation = useNavigation();
    const [cityDetails, setCityDetails] = useState({})
    const [coordinate, setCoordinates] = useState({
        latitude: 0,
        longitude: 0
    })
    const [placesData, setPlaceData] = useState([1, 2, 3, 4, 5]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const showComingSoonAlert = () => {
        Alert.alert('Alert', 'Feature Coming Soon')
    }

    const openLink = () => {
        const url = 'https://en.wikipedia.org/wiki/Jaipur'
        Linking.openURL(url).catch(err => Alert.alert('Error', 'Error Opening Browser'))
    }

    const fetchCityDetail = async () => {
        const data = await fetchCityData(cityData.name);
        console.log('Complete: ', data[0])
        setCityDetails(data[0]);
    }

    useEffect(() => {
        if (cityDetails && cityDetails.latitude && cityDetails.longitude) {
            setCoordinates({
                latitude: cityDetails.latitude,
                longitude: cityDetails.longitude,
            });
            console.log(`Lat = ${cityDetails.latitude}, Long = ${cityDetails.longitude}`);
        }
    }, [cityDetails]);  // This effect will run whenever cityDetails is updated

    useEffect(() => {
        console.log('Inside Details Screen')
        fetchCityDetail();
    },[])

    const renderPlaces = ({ item }) => (
        <View style={styles.placeContainer}>
            <View style={{ overflow: 'hidden' }}>
                <View style={styles.placeTitleView}>
                    <Text style={{ fontSize: 24, marginLeft: 10, fontWeight: 'bold' }}>Hawa Mahal</Text>
                    <Text style={{ fontSize: 18, marginRight: 10, fontWeight: '600' }}>1.2 Km</Text>
                </View>
                <Text style={{ marginHorizontal: 10 }} numberOfLines={10} ellipsizeMode="tail" >
                    The Hawa Mahal is a five-storey building, and it is the tallest building in the world that has been built without a foundation. It has a curved architecture that leans at an 87 degree angle, and a pyramidal shape which has helped it stay erect for centuries. The Hawa Mahal is dedicated to Lord Krishna.
                </Text>
                <TouchableOpacity onPress={openLink} style={{ marginLeft: 10, marginTop: 10 }}>
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
                <TouchableOpacity>
                    <HeartIcon
                        size="35"
                        color={'red'} />
                </TouchableOpacity>
            </View>
            {/* MapView */}
            <View style={styles.mapView}>
                {/* <Text>TODO: MAP VIEW</Text> */}
                <MapView
                    style={styles.map}
                    region={{
                        latitude: coordinate.latitude,
                        longitude: coordinate.longitude,
                        latitudeDelta: 0.05,  // zoom level
                        longitudeDelta: 0.05, // zoom level
                    }}
                    mapType="standard"
                >
                    {/* Add a marker on the map */}
                    <Marker
                        coordinate={coordinate}
                        title="My Location"
                        description="This is my pinned location!"
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
        // backgroundColor: 'gray'
    },
    cardList: {
        paddingLeft: 20,
    },
    card: {
        width: width * 0.7, // Each card takes up 60% of the screen width
        height: height * 0.35,
        marginRight: 15,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 1,
        //backgroundColor: 'red'
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
        // backgroundColor: 'red',
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
        //backgroundColor: 'lightgreen',
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
        color: 'blue', // Set the color you want for the link
        textDecorationLine: 'underline', // Optionally, underline the link
    }
})