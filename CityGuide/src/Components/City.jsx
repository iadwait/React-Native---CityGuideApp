import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { HeartIcon } from 'react-native-heroicons/solid'
import { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

const { width, height } = Dimensions.get('window');

const City = ({ city, liked, onLikeToggle }) => {
    const navigation = useNavigation();

    useEffect(() => {
        console.log(city)
    }, [])

    // Call delegate method
    const toggleFavourite = () => {
        console.log(`toggleFavourite: ${city.id}`)
        onLikeToggle(city.id)
    }

    return (
        <View style={{ alignItems: 'center' }}>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('CityDetail', {cityData: city, isLiked: liked})}>
                {/* City Element */}
                <View style={styles.cityElement}>
                    {/* View Top */}
                    <View style={styles.viewTop}>
                        <Image
                            //source={require('../Images/sampleCity.jpeg')}
                            source={{ uri: city.image_url }}
                            style={styles.cityImage}
                        />
                        <Text style={styles.cityName}>{city.name}</Text>
                        <TouchableOpacity style={styles.heartIcon} onPress={toggleFavourite}>
                            <HeartIcon
                                size="35"
                                color={liked ? 'red' : 'white'} />
                        </TouchableOpacity>
                        <View style={styles.viewInfo}>
                            <Text style={styles.textInfo}>
                                {city.degree_of_weather} {city.weather}
                            </Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.textInfo}>{city.distance_from_previous} km</Text>
                                <Image
                                    source={require('../Images/icon_greaterThan.png')}
                                    style={{ tintColor: 'white', width: 20, height: 20 }}
                                />
                            </View>
                        </View>
                    </View>
                    {/* View Bottom */}
                    <View style={styles.viewBottom}>
                        <Text style={{ textAlign: 'left', padding: 10 }}>
                            {city.description}
                        </Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

export default City

const styles = StyleSheet.create({
    // City View
    cityElement: {
        // backgroundColor: 'green',
        width: width * 0.9,
        marginBottom: 20,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 20,
        overflow: 'hidden'
    },
    viewTop: {
        flex: 1
    },
    viewBottom: {
        flex: 1
    },
    cityImage: {
        flex: 1,
        height: height * 0.18,
        width: '100%',
        opacity: 1
    },
    cityName: {
        color: 'white',
        fontWeight: '900',
        fontSize: 38,
        position: 'absolute',
        bottom: 10,
        left: 2
    },
    heartIcon: {
        position: 'absolute',
        right: 10,
        top: 10
    },
    viewInfo: {
        position: 'absolute',
        bottom: '10',
        right: 10
    },
    textInfo: {
        color: 'white',
        fontWeight: '800'
    }
})