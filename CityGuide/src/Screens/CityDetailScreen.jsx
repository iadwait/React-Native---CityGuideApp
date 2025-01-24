import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { HeartIcon } from 'react-native-heroicons/solid'

const CityDetailScreen = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{ flex: 1 }}>
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
    }
})