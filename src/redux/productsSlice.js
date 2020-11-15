import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'

import { getPageId } from 'src/lib/functions/menuFunctions.js'

const initialState = {
    allProducts : [],
    breakfastItems : [],
    lunchItems : [],
    snacksSweets : []
}


export const getAllProducts = createAsyncThunk('allProducts/getAllProducts', async () => {
    console.log(`fetching all products`);
    await getPageId()
})


export const getAllItems = createAsyncThunk('products/getAllItems',async () => {
    logger && console.log('running getAllItems Thunk')
})

const productsSlice = createSlice({
    name : 'products',
    initialState,
    reducers : {

    },
    reducers:{
        setProductIdsAll : (state,action)=>{
            state.allProducts = action.payload
        }
    },
    extraReducers : {
        [getAllProducts.pending] : (state, action)=>{
            console.log(`getting products`);

        },
        [getAllProducts.fulfilled]: (state, action) => { 
            console.log(`got products`);
        },
        [getAllProducts.rejected]: (state, action) => { 
            console.log(`something went wrong getting products`);
        },
        [getAllItems.pending] : (state,action) => {},
        [getAllItems.fulfilled] : (state,action) => {},
        [getAllItems.rejected] : (state,action) => {},
    }
})

export const { setProductIdsAll } = productsSlice.actions

export default productsSlice.reducer