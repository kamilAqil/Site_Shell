
let logger = 1

// axios
import axios from 'axios'




export const handleModifierCheck = async (e, modi, modifiersSelected, setModifiersSelected, tempPagePrice, setTempPagePrice) => {
    logger && console.log(`handleModifierCheck clicked current modifiersSelected`, modifiersSelected)
    let elToUpdate = modifiersSelected.findIndex(el=>el.name==modi.modifier_data.name)
    logger && console.log(`elToUpdate is`, elToUpdate)
    logger && console.log(`need to update status for incoming modi`, modi)
    logger && console.log(`modifiersSelected[elToUpdate]`, modifiersSelected[elToUpdate])
    let newPrice = 0
    let priceObject = {}
    if (modi.modifier_data.price_money) {
        priceObject = modi.modifier_data.price_money
    } else {
        priceObject = {
            amount: 0,
            currency: 'USD'
        }
    }

    if (modifiersSelected[elToUpdate].selected == false){
        logger && console.log(`NEED TO SET TO True`)
        modifiersSelected[elToUpdate].selected = true
        // update price need to add price amount
        logger && console.log(`updating price`, tempPagePrice)
        logger && console.log(`with modi`,modi)

        logger && console.log(`with priceObject`, priceObject)

         newPrice = tempPagePrice + priceObject.amount
    }else{
        logger && console.log(`NEED TO SET TO False`)
        modifiersSelected[elToUpdate].selected = false
        // update price need to subtract price amount
        logger && console.log(`updating price`, tempPagePrice)
        logger && console.log(`with priceObject`, priceObject)
        newPrice = tempPagePrice - priceObject.amount
    } 

    logger && console.log(`modifiersSelected after update`, modifiersSelected)
    let  newModifiersSelected = modifiersSelected

    
   
    
    setModifiersSelected(newModifiersSelected)
    setTempPagePrice(newPrice)
}

export const handleAddToOrderButtonClick = async (e, existingOrder, catalogObject, modifiersSelected, qty,taxData)=>{
    logger && console.log(`current hook state at time of add`, modifiersSelected)
    logger && console.log(`current hook state at time of add`, qty)

    logger && console.log(`current catalogObject`, catalogObject)
    let dataReturnedFromAPI = {}

    /*
        initialize data for square api
    */
    let arrayOfSelectedMods = [

    ]

    modifiersSelected.forEach((mod) => {
        logger && console.log(`object keys loop mod`, mod)
        if (mod.selected) {
            logger && console.log(`ADDING MODIFIER TO ORDER ITEM WHILE ADDING TO ORDER`, mod)
            arrayOfSelectedMods.push({
                catalog_object_id: mod.modifier_data.id
            })
        }
    })

    logger && console.log(`arrayOfSelectedMods`, arrayOfSelectedMods)

    let orderObject = {
        quantity: JSON.stringify(qty),
        catalog_object_id: catalogObject.variationID,
        modifiers: arrayOfSelectedMods,
        taxData : taxData
    }

    /*
        check for existing order in state

        
        if no order create new order
        (set in redux state and local state)

        if existing order then add to existing order
    */
    if (existingOrder){
        logger && console.log(`THERE IS AN EXISTING Order`,existingOrder)
        logger && console.log(`existingOrder version`, existingOrder.version)
       

        orderObject.version = existingOrder.version 

        logger && console.log(`order object for existing order`, orderObject)
        dataReturnedFromAPI = await callUpdateOrderAPI(orderObject, existingOrder.id)
    }else{
        logger && console.log(`THERE IS NO EXISTING Order Creating New Order`)
        


        // creating a new order
        dataReturnedFromAPI = await calladdToOrderAPI({ orderObject: orderObject })
    }

    if (dataReturnedFromAPI.data.order.id){
        logger && console.log(`dataReturnedFromAPI order id`, dataReturnedFromAPI.data.order.id)

        /*
            check to see if there is a local storage value for order
            and if not add order id to local storage
        */
        logger && console.log(`window.localStorage.green_life_order`, window.localStorage.green_life_order)

        if (!window.localStorage.green_life_order){
            localStorage.setItem("green_life_order", dataReturnedFromAPI.data.order.id);
        }
        

    }


    logger && console.log(`window local storage`, window.localStorage)

   

    return dataReturnedFromAPI
}


export const calladdToOrderAPI = async (orderObject) => {

    /*
        Will need to check if there is an order in state
    */


    let dataToReturn = await axios.post('/api/createOrder', { orderObject}).then((data) => {
        logger && console.log(`axios call to createOrder returned`, data)
        return data
    }).catch((err) => {
        logger && console.log(`something went wrong creating order`)
    })

    return dataToReturn
}

export const callUpdateOrderAPI = async (orderObject,orderID) => {

    let dataToReturn = await axios.post('/api/updateOrder', { orderObject, orderID }).then((data)=>{
        logger && console.log(`GOT BACK DATA FROM UPDATE ORDER`,data)
        return data
    }).catch((err)=>{
        logger && console.log(`SOMETHING WENT WRONG CALLING UPDATE ORDER API`)
    })


    return dataToReturn
}

