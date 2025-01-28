import axios from "axios";

// Endpoints
const baseURL = "http://localhost"
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
        console.log(JSON.stringify(response.data, null, 2));
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