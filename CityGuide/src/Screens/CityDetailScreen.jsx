import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, FlatList, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { HeartIcon } from 'react-native-heroicons/solid'
import { useState } from 'react'
import Carousel from 'react-native-reanimated-carousel';

const { width, height } = Dimensions.get('window');

const CityDetailScreen = () => {
    const navigation = useNavigation();
    const [placesData, setPlaceData] = useState([1, 2, 3, 4, 5]);

    const renderPlaces = ({ item }) => (
        <View style={styles.placeContainer}>
            <View style={{ height: '50%', overflow: 'hidden' }}>
                <View style={styles.placeTitleView}>
                    <Text style={{ fontSize: 24, marginLeft: 10, fontWeight: 'bold' }}>Hawa Mahal</Text>
                    <Text style={{ fontSize: 18, marginRight: 10, fontWeight: '600' }}>1.2 Km</Text>
                </View>
                <Text style={{ marginHorizontal: 10, lineHeight: 20 }} ellipsizeMode="tail" >
                    The Hawa Mahal is a five-storey building, and it is the tallest building in the world that has been built without a foundation. It has a curved architecture that leans at an 87 degree angle, and a pyramidal shape which has helped it stay erect for centuries. The Hawa Mahal is dedicated to Lord Krishna.
                </Text>
            </View>
            <View style={{ alignItems: 'center' }}>
                <View style={styles.placeButtonView}>
                    <TouchableOpacity style={styles.placeButtons}>
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
                    <TouchableOpacity style={styles.placeButtons}>
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
                <Text style={styles.title}>JAIPUR</Text>
                <TouchableOpacity>
                    <HeartIcon
                        size="35"
                        color={'red'} />
                </TouchableOpacity>
            </View>
            {/* MapView */}
            <View style={styles.mapView}>
                <Text>TODO: MAP VIEW</Text>
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
                    scrollAnimationDuration={1500}
                    renderItem={renderPlaces}
                />
            </View>
        </SafeAreaView>
    )
}

export default CityDetailScreen

const styles = StyleSheet.create({
    viewNavigation: {
        padding: 25,
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
        marginVertical: 10,
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
        // backgroundColor: 'lightgreen',
        marginHorizontal: 8,
        marginVertical: 10,
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
        // backgroundColor: 'green',
        width: width * 0.3,
        marginHorizontal: '10',
        paddingHorizontal: 10,
        paddingVertical: 5,
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
    }
})