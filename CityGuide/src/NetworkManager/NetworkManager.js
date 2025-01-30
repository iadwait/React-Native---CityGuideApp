import axios from "axios";
import { Platform } from "react-native";

// Endpoints
const baseURL = Platform.OS === 'ios' ? "http://localhost" : "http://10.0.2.2" // Insted of localhost we use 10.0.2.2 otherwise error for Android
const citiesEndpoint = `${baseURL}:3001/cities`
const cityDetailsEndpoint = cityName => `${baseURL}:3002/cities?name=${cityName}`

const makeApiCall = async (endpoint, params) => {
    const options = {
        method: params ? 'POST' : 'GET',
        url: endpoint,
        params: params || {}
    }

    try {
        const response = await axios.request(options)
        //console.log(`API Response: ${response.data}`)
        //console.log("API RESPONSE: ##")
        //console.log(JSON.stringify(response.data, null, 2));
        return response.data
    } catch (error) {
        console.log('Error Occured:', error)
        const errorMessage = error.errorMessage || "Something went wrong please try again later"
        return {error: errorMessage}
    }
}

// Accessible Functions

export const fetchCitiesListData = () => {
    return makeApiCall(citiesEndpoint)
}

export const fetchCityData = (cityName) => {
    return makeApiCall(cityDetailsEndpoint(cityName))
}