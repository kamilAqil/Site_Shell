import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
let logger = 1





const initialState = {

}



/*
    increaseQuantity thunk
*/
export const increaseQuantityThunk = createAsyncThunk('cartData/increaseQuantity', async (uid, thunkAPI) => {
    let state = thunkAPI.getState()
    let order = state.cart.order
    let orderID = state.cart.order.id
    let line_items = state.cart.order.line_items
    logger && console.log(`line_items `, line_items)
    let objectToMatch = line_items.find((el) => el.uid === uid)
     console.log(`objectToMatch`, objectToMatch)
    /*
        call updateItemQuantity with
        data = {
            update : (String: increase | decrease),
            line_item : (Obj : objectToMatch),
            orderID : (String : orderID)
        }
    */
    let dataForUpdateQtyAPI = {
        update: 'increase',
        line_item: objectToMatch,
        orderID: orderID,
        orderObject: order
    }

     console.log(`dataForUpdateQtyAPI before calling /api/updateItemQuantity`, dataForUpdateQtyAPI)

    let data = await axios.post('/api/updateItemQuantity', dataForUpdateQtyAPI).then((data) => {
         console.log(`SUCCESSFULLY CALLED /api/updateItemQuantity GOING TO RETURN DATA`)
         console.log(`data`, data)
        return data
    }, (err) => {
         console.log(`SOMETHING WENT WRONG /api/updateItemQuantity GOING TO RETURN ERR`)
         console.log(`data`, err)

    })

    return data
})



/*
    decreaseQuantity thunk
*/
export const decreaseQuantityThunk = createAsyncThunk('cartData/decreaseQuantity', async (uid, thunkAPI) => {

    let state = thunkAPI.getState()
    let order = state.cart.order
    let orderID = state.cart.order.id
    let line_items = state.cart.order.line_items
     console.log(`line_items `, line_items)
    let objectToMatch = line_items.find((el) => el.uid === uid)
     console.log(`objectToMatch`, objectToMatch)
    /*
        call updateItemQuantity with
        data = {
            update : (String: increase | decrease),
            line_item : (Obj : objectToMatch),
            orderID : (String : orderID)
        }
    */
    let dataForUpdateQtyAPI = {
        update: 'decrease',
        line_item: objectToMatch,
        orderID: orderID,
        orderObject: order
    }

     console.log(`dataForUpdateQtyAPI before calling /api/updateItemQuantity`, dataForUpdateQtyAPI)

    let data = await axios.post('/api/updateItemQuantity', dataForUpdateQtyAPI).then((data) => {
         console.log(`SUCCESSFULLY CALLED /api/updateItemQuantity GOING TO RETURN DATA`)
         console.log(`data`, data)
        return data
    }, (err) => {
         console.log(`SOMETHING WENT WRONG /api/updateItemQuantity GOING TO RETURN ERR`)
         console.log(`data`, err)

    })


    return data
    // return updated order
})

/*
    check for order thunk
*/
export const checkForExistingOrder = createAsyncThunk('cartData/checkForExistingOrder', async (orderID) => {
     console.log(`dispatching checkForExistingOrder, orderID`, orderID)
    let dataFromApiCall = await axios.post('/api/checkForExistingOrder', { id: orderID }).then((data) => {
        console.log(`data inside of axios post to /api/checkForExistingOrder`, data.data)
        return data.data

    })

     console.log(`dataFromApiCall checkForExistingOrder`, dataFromApiCall)
    if (!dataFromApiCall) {
         console.log(`NEED TO CLEAR LOCAL STORAGE OF ORDER ID BECAUSE IT DOES NOT EXIST`)
        localStorage.removeItem("green_life_order");
         console.log(`REMOVED ORDER ID FROM LOCAL STORAGE`)
    } else {

    }
    return dataFromApiCall
})



export const getOrder = state => state.cart.order

export const get_line_items = (state) => {
    let line_items = []
    let order = state.cart.order
    if (order) {
        line_items = state.cart.order.line_items

    }
    return line_items
}

export const getNumberOfItemsInCart = (state) => {
    let number = 0
    let order = state.cart.order
    if (order && order.line_items) {
        /*
           Loop through line items to get total
        */

        order.line_items.forEach((item) => {
            number += parseInt(item.quantity)
        })
    }
    return number
}

export const getCartSubtotal = (state) => {
    let order = state.cart.order
    let subtotal = 0

    if (order) {
        subtotal = order.total_money.amount
    }
    return subtotal
}


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        createOrder(state, action) {
            state.order = action.payload
        },
    },
    extraReducers: {
        [increaseQuantityThunk.pending]: (state, action) => {
            console.log(`increaseQuantityThunk is pending`)
        },
        [increaseQuantityThunk.fulfilled]: (state, action) => {
            console.log(`increaseQuantityThunk is fulfilled got back data`, action.payload)
            let order = action.payload.data.order
            state.order = order
        },
        [increaseQuantityThunk.rejected]: (state, action) => {
            console.log(`increaseQuantityThunk.rejected something went wrong`)
        },
        [decreaseQuantityThunk.pending]: (state, action) => {
            console.log(`decreaseQuantityThunk is pending`)
        },
        [decreaseQuantityThunk.fulfilled]: (state, action) => {
            console.log(`decreaseQuantityThunk is fulfilled got back data`, action.payload)
            let order = action.payload.data.order
            state.order = order
        },
        [decreaseQuantityThunk.rejected]: (state, action) => {
            console.log(`decreaseQuantityThunk.rejected something went wrong`)
        },
        [checkForExistingOrder.pending]: (state, action) => {
            console.log(`checkForExistingOrder is pending`)
        },
        [checkForExistingOrder.fulfilled]: (state, action) => {
            console.log(`checkForExistingOrder is fulfilled got back data`, action.payload)
            let order = action.payload
            state.order = order
           
        },
        [checkForExistingOrder.rejected]: (state, action) => {
            console.log(`checkForExistingOrder.rejected something went wrong`)
            logger && console.log(`action`,action)
        },

    }
})

export const { createOrder } = cartSlice.actions

export default cartSlice.reducer