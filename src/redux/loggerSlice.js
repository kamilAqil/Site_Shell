import { createSlice, createSelector } from '@reduxjs/toolkit'


const initialState = {
    logger: 1
}

const loggerSlice = createSlice({
    name: 'logger',
    initialState,
    reducers: {
       
    }
})



export const getLogger = state => state.logger.logger



export default loggerSlice.reducer