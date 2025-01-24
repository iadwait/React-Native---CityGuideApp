import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { HeartIcon } from 'react-native-heroicons/solid'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

const { width, height } = Dimensions.get('window');

const City = () => {
    const navigation = useNavigation();
    const [favourite, setFavourite] = useState(false);
    return (
        <View style={{ alignItems: 'center' }}>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('CityDetail')}>
                {/* City Element */}
                <View style={styles.cityElement}>
                    {/* View Top */}
                    <View style={styles.viewTop}>
                        <Image
                            source={require('../Images/sampleCity.jpeg')}
                            style={styles.cityImage}
                        />
                        <Text style={styles.cityName}>JAIPUR</Text>
                        <TouchableOpacity style={styles.heartIcon} onPress={() => setFavourite(!favourite)}>
                            <HeartIcon
                                size="35"
                                color={favourite ? 'red' : 'white'} />
                        </TouchableOpacity>
                    </View>
                    {/* View Bottom */}
                    <View style={styles.viewBottom}>
                        <Text style={{ textAlign: 'left', padding: 10 }}>
                            Jaipur is the capital of India’s Rajasthan state. It evokes the royal family that once ruled the region and that, in 1727, founded what is now called the Old City, or “Pink City” for its trademark building color. At the center of its stately street grid (notable in India) stands the opulent, colonnaded City Palace complex. With gardens, courtyards and museums, part of it is still a royal residence.
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
        height: height * 0.4,
        marginBottom: 20,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 20,
    },
    viewTop: {
        // backgroundColor: 'green',
        height: 0.5,
        flex: 1
    },
    viewBottom: {
        // backgroundColor: 'red',
        height: 0.5,
        flex: 1
    },
    cityImage: {
        flex: 1,
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
    }
})