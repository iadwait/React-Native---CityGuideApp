import { View, Text, Dimensions, StyleSheet, TextInput, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import City from '../Components/City';
import { ScrollView } from 'react-native-gesture-handler';
import { useState, useEffect } from 'react'
import { fetchCitiesListData } from '../NetworkManager/NetworkManager';
import Loader from '../Components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { saveCityList } from '../Redux/Slice/CityListSlice'
import { useFocusEffect } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
    const [cities, setCitiesData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const filteredCities = cities.filter(city =>
        city.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    // Store
    const cityListStoreVal = useSelector((state) => state.cityListState.cityList)
    const dispatch = useDispatch();

    useEffect(() => {
        if (JSON.stringify(cityListStoreVal) !== JSON.stringify(cities)) {
            console.log(`New Cities Assigning`)
            console.log('cityListStoreVal: ', cityListStoreVal.length)
            if (cityListStoreVal && cityListStoreVal.length > 0) {
                console.log(`New Cities Assigned`)
                setCitiesData(cityListStoreVal);
            }
        } else {
            console.log('cityListStoreVal is same as cities')
        }
    }, [cityListStoreVal]);

    const resetSearchQuery = () => {
        console.log('Inside Reset')
        setSearchQuery('');
    }

    // Delegate Method Callback
    const onLikeToggleCallback = (cityId) => {
        console.log(`Callback received: ${cityId}`)
        // Update Like Status in Cities Array
        setCitiesData((cities) => {
            return cities.map((city) =>
                city.id === cityId ? { ...city, liked: !city.liked } : city
            )
        })
    }

    const getCitiesDetails = async () => {
        try {
            const data = await fetchCitiesListData();
            setTimeout(() => {
                setLoading(false);
                if (Array.isArray(data)) {
                    if (data.length > 0) {
                        setCitiesData(data);
                        dispatch(saveCityList(data)) // Save to Store
                    } else {
                        Alert.alert('Error, CityList Data is empty from api')
                    }
                } else {
                    Alert.alert('Error', `Fetched data is not an array: ${data}`)
                    console.error("Fetched data is not an array:", data);
                }
            }, 1000)
        } catch (error) {
            setTimeout(() => {
                setLoading(false);
                Alert.alert('Error', `Error fetching cities data: ${error}`)
            }, 1000)
        }
    }

    // View did load
    useEffect(() => {
        setLoading(true)
        getCitiesDetails()
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* Search View */}
            <View style={styles.searchView}>
                <View style={styles.inputContainer}>
                    <Image
                        source={require('../Images/icon_search.png')}
                        style={styles.icons}
                    />
                    <TextInput
                        placeholder='Search Cities...'
                        style={styles.textInput}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
                <View style={{ paddingRight: 6 }}>
                    <TouchableOpacity onPress={resetSearchQuery}>
                        <Image
                            source={require('../Images/icon_cross.png')}
                            style={styles.icons}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            {
                loading ?
                    (
                        <Loader />
                    )
                    :
                    (
                        filteredCities.length > 0 ?
                            (
                                <View style={{ flex: 1 }}>
                                    {/* City List View*/}
                                    <ScrollView
                                        showsVerticalScrollIndicator={false}
                                    >
                                        {
                                            filteredCities.map((city, index) => {
                                                return (
                                                    <City
                                                        key={city.id}
                                                        city={city}
                                                        liked={city.liked}
                                                        onLikeToggle={onLikeToggleCallback} // Callback for Like
                                                    />
                                                )
                                            })
                                        }
                                    </ScrollView>
                                </View>
                            )
                            :
                            (
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: 'black', fontWeight: 'bold' }}>No Results</Text>
                                </View>
                            )
                    )
            }
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