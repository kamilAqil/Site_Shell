import {createSlice, createSelector} from '@reduxjs/toolkit'

import { useWidth } from 'src/lib/functions/globalFunctions.js'


const initialState = {
    width : 'xs',
}


const pageWrapperSlice = createSlice({
    name : 'pageWidth',
    initialState, 
    reducers : {
        setPageWidth(state,action){
            state.width = action.payload
        }
    }
})


export const {setPageWidth} = pageWrapperSlice.actions

export const getWidth = state => state.width.width

console.log(`getWidth in pageWrapperSlice`)


export const gWidth = createSelector([getWidth], (getWidth) => { console.log('gWidth output');return getWidth})


export default pageWrapperSlice.reducer