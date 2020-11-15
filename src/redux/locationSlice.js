import { createSlice, createSelector, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


let logger = 1

const initialState = {

}


export const getSquareLocationData = createAsyncThunk('locationData/getLocationData', async ()=>{
    logger && console.log(`getSquareLocationData fired`)



    let locationDataToReturn = await axios.get('/api/getLocationData').then((data)=>{
        logger && console.log(`call to getLocationData api was a success returning data`,data)
        return data.data
    },(err)=>{
        if(err){
            logger && console.log(`something went wrong getting data from getLocationData api`, err)
        }
        
    })
    logger && console.log(`locationDataToReturn before returning`, locationDataToReturn)
    // locationDataToReturn = JSON.stringify(locationDataToReturn)

    return locationDataToReturn
    
})




const locationSlice = createSlice({
    name : 'location',
    initialState,
    reducers : {

    },
    extraReducers : {
        [getSquareLocationData.pending]: (state, action)=>{
            logger && console.log(`getSquareLocationData pending`)
        },
        [getSquareLocationData.fulfilled]: (state, action) => {
            logger && console.log(`getSquareLocationData fulfilled`)
            // logger && console.log(`action payload`, action.payload.locations[0])
            let obj = action.payload.locations[0]
            state.location = obj
         },
        [getSquareLocationData.rejected]: (state, action) => {
            logger && console.log(`getSquareLocationData rejected`)
         },
    }
})

export const getLocation = state => state.location.location

export default locationSlice.reducer