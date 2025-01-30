import { configureStore } from "@reduxjs/toolkit";
import cityListStateReducer from '../Slice/CityListSlice'

export const store = configureStore({
    reducer: {
        cityListState: cityListStateReducer
    }
})

export default store