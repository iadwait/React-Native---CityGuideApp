import { View, Text, Button, Dimensions, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import City from '../Components/City';
import { ScrollView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
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
                    <City />
                    <City />
                    <City />
                    <City />
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