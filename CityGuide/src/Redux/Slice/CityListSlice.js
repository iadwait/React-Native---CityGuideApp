import { createSlice } from "@reduxjs/toolkit";


const cityListSlice = createSlice({
    name: 'cityListState',
    initialState: {
        cityList: []
    },
    reducers: {
        saveCityList: (state, data) => {
            state.cityList = data.payload
        },
        updateCityListLikeData: (state, action) => {
            console.log(`Inside Store updateCityListLikeData: ${action.payload}`)
            const { id, isLiked } = action.payload;
            state.cityList = state.cityList.map((city) =>
                city.id === id ? { ...city, liked: isLiked } : city
            );
            console.log(`Updated Store: `)
            console.log(JSON.stringify(state.cityList, null, 2));
        }
    }
})

// Export Actions
export const { saveCityList, updateCityListLikeData } = cityListSlice.actions

// Export Reducer
export default cityListSlice.reducer