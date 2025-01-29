import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'

const Loader = () => {
    return (
        <View style={styles.loaderParent}>
            <View style={styles.loaderContainer}>
                <ActivityIndicator size='large' style={{ marginTop: 10 }} />
                <Text style={{ marginTop: 10, fontSize: 14, fontWeight: '500' }}>Please wait</Text>
            </View>
        </View>
  )
}

export default Loader

const styles = StyleSheet.create({
    loaderParent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loaderContainer: {
        width: 120,
        height: 120,
        backgroundColor: '#fff',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        elevation: 5
    }
})