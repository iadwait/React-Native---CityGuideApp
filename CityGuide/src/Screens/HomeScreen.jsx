import { View, Text, Button, Dimensions, StyleSheet, TextInput, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import City from '../Components/City';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import { useState, useEffect } from 'react'

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
    const citiesEndpoint = 'http://localhost:3001/cities'
    const [cities, setCitiesData] = useState([]);

    const getCitiesDetails = async () => {
        try {
            const response = await axios.get(citiesEndpoint)
            console.log(JSON.stringify(response.data, null, 2));
            setCitiesData(response.data)
        } catch (error) {
            Alert.alert('Error', `Error fetching cities data: ${error}`)
        }
    }

    // View will Appear
    useEffect(() => {
        getCitiesDetails()
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                {/* Search View */}
                <View style={styles.searchView}>
                    <View style={styles.inputContainer}>
                        <Image
                            source={require('../Images/icon_search.png')}
                            style={styles.icons}
                        />
                        <TextInput
                            placeholder='Search Cities...'
                            style={styles.textInput} />
                    </View>
                    <View style={{ paddingRight: 6 }}>
                        <TouchableOpacity>
                            <Image
                                source={require('../Images/icon_cross.png')}
                                style={styles.icons}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* City List View*/}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    {
                        cities.map((city, index) => (
                            <City key={index} city={city} />       
                        ))
                    }
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    searchView: {
        borderColor: 'gray',
        borderWidth: 0.5,
        marginVertical: 20,
        padding: 4,
        width: width - 16,
        marginHorizontal: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 20
    },
    inputContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 6
    },
    icons: {
        width: 30,
        height: 30
    },
    textInput: {
        flex: 1,
        marginHorizontal: 10,
        fontSize: 16,
        fontWeight: '500',
        flexWrap: 'nowrap',
        height: 50
    },
    scrollView: {
        paddingBottom: 20,
        flex: 1
    }
})