import { api, catalogApi } from 'src/square/SquareConnect.js'

import axios from 'axios'

let logger = 1

async function getCategoryID(category) {
    /*
    getCategoryID(category) will accept a string 'breakfast', lunch, sweet/snacks
    and return corresponding categoryID to pass to getItems
    */
    /*
        Gets an id based of an input
        string category
        breakfast | lunch | sweetsSnacks
    */
    console.log(`running getCategoryID for ${category}`);


    let body = {
        "object_types": [
            "CATEGORY"
        ]
    }

    let id = await catalogApi.searchCatalogObjects(body).then((data) => {

        let arrayOfCategories = data.objects
        logger && console.log(`arrayOfCategories in searchCatalogObjects`, arrayOfCategories)
        /*
            find object where category_data.name
            is equal to category passed to getCategoryID()
            and return that id
        */

        let categoryObject = arrayOfCategories.find((rCategory) => {
            logger && console.log('matching ${rCategory}', rCategory)
            logger && console.log(`with ${category}`)
            return rCategory.category_data.name == category
        })

        console.log(`categoryObject from find`, categoryObject)

        // return categoryObject.id
        if(categoryObject){
            return categoryObject.id
        }

    }, (err) => {
        console.error(err);
        throw err
    })



    return id

}


async function getItems(categoryID) {
    /*
    getItems(categoryID) is a function that returns items related
    to provided categoryID
    */
    /*
        this function accepts a 
        category id and returns an 
        array of items 
    */

    let body = {
        "include_related_objects": true,
        "query": {
            "exact_query": {
                "attribute_value": categoryID,
                "attribute_name": "category_id"
            }
        }
    }

    logger && console.log(`going to get items for ${categoryID}`)

    if(categoryID){
        let items = await catalogApi.searchCatalogObjects(body).then((data) => {

            let arrayofItems = data.objects
            return arrayofItems
    
        }, (err) => {
            console.error(err);
            throw err
        })
    
        console.log(`returning items`);
        console.log(items);
        
    
        return items
    }else{
        return []
    }

    // let items = await catalogApi.searchCatalogObjects(body).then((data) => {

    //     let arrayofItems = data.objects
    //     return arrayofItems

    // }, (err) => {
    //     console.error(err);
    //     throw err
    // })

    // console.log(`returning items`);
    // console.log(items);
    

    // return items
}


async function getAllItems(){
    // call api to get all a items
   logger && console.log('getting all items')

    let opts = {
        'types' : 'ITEM'
    }

    let items = catalogApi.listCatalog(opts).then((data)=>{
        if(data){
            logger && console.log('listCatalog data',data)
            return data.objects
        }
    },(err)=>{
        if(err){
            throw err
        }
    })

    return items
}

async function getAllCateringItems(){
    // call api to get all a items
   logger && console.log('getting all catering items')

    let opts = {
        'types' : 'ITEM'
    }

    let items = catalogApi.listCatalog(opts).then((data)=>{
        if(data){
            let cateringObjects = [

            ]
            logger && console.log('listCatalog data',data)
            /*
                loop through all data to get 
            */
            data.objects.forEach((item)=>{
                if(item.custom_attribute_values){
                    cateringObjects.push(item)
                }
            })

            
            return cateringObjects
        }
    },(err)=>{
        if(err){
            throw err
        }
    })

    return items
}

async function getAllIndividualPackedItems(){
    // call api to get all a items
   logger && console.log('getting all items')

    let opts = {
        'types' : 'ITEM'
    }

    let items = catalogApi.listCatalog(opts).then((data)=>{
        if(data){
            logger && console.log('listCatalog data',data)
            return data.objects
        }
    },(err)=>{
        if(err){
            throw err
        }
    })

    return items
}

/*
    This function gets an array of item ids for all items
    in square inventory
*/
async function getPageId() {
    /*
    get page id is a function that gets a list of possible
    item ids for static paths on the customizeMenu/[id]
    page
    
    */
    let body = {
        "object_types": [
            "ITEM"
        ]
    }
    // getting all item ids
    let items = await catalogApi.searchCatalogObjects(body).then((data) => {
        logger && console.log(`data when getting page ids`,data)
        let arrayOfIds = []
        data.objects.map((item) => {

            logger && console.log(`item returned in data map of searchCatalogItems`, item.id)
            arrayOfIds.push(item.id)
        })
        return arrayOfIds
    })

    logger && console.log(items)

    return items
}


async function getCatalogObject(id) {
    /*
        Retrieve catalog object will return info about
        item based on object id
        
        
        need data
        info
            name,
            price,
            description,
            modifiers,
            imageURL
    */
    logger && console.log(`getting catalog object for ${id}`)

    // initialize object to return 
    let getCatalogObjectToReturn = {}
    
    let modifier_list_array = []

    /*
        call square sdk to retrieve object
        get relatedObjects
    */
    let opts = {
        'includeRelatedObjects': true
    };
    /*
        First call will get info about item
    */
    await catalogApi.retrieveCatalogObject(id, opts).then((data) => {
        logger && console.log(`retrieveCatalogObject data`, data)
        let relatedObjects = data.related_objects
        let mainObject = data.object
        let variations = mainObject.item_data.variations
        getCatalogObjectToReturn.variations = variations
        logger && console.log('variations in retrieveCatalogObject',variations)
        /*
            main object has item_data
            which contains name, description
            it also has modifier list but 
            we will validate that right after
        */
        if (mainObject.item_data.variations[0].item_variation_data.pricing_type == 'FIXED_PRICING'){
            logger && console.log(`mainObject.item_data.variations FIXED_PRICING`, mainObject.item_data)
            getCatalogObjectToReturn.price = mainObject.item_data.variations[0].item_variation_data.price_money.amount
            logger && console.log(`price is `, getCatalogObjectToReturn.price)
        }else{
            logger && console.log(`mainObject.item_data.variations VARIABLE_PRICING`, mainObject.item_data)
            getCatalogObjectToReturn.price = 'Variable'
            logger && console.log(`price is VARIABLE`, mainObject.item_data.variations[0].item_variation_data.pricing_type)
        }
        getCatalogObjectToReturn.id = id
        logger && console.log(`variation item_id`, mainObject.item_data.variations[0].item_variation_data.item_id)
        getCatalogObjectToReturn.variationID = mainObject.item_data.variations[0].id
        getCatalogObjectToReturn.name = mainObject.item_data.name
        if(mainObject.item_data.description){
            getCatalogObjectToReturn.description = mainObject.item_data.description
        }
        // getCatalogObjectToReturn.description = mainObject.item_data.description
        


        /*
            check for modifier data and if it exists 
            will push modifier object id to array 
            modifier_list_array
        */
        let modifier_list_info_array = mainObject.item_data.modifier_list_info
        if (modifier_list_info_array) {
            modifier_list_info_array.forEach((modifier) => {
                modifier_list_array.push(modifier.modifier_list_id)
               
            
            })
            logger && console.log(`modifier_list_array in retrieveCatalogObject`, modifier_list_array)
            getCatalogObjectToReturn.modifier_list_id_array = JSON.stringify(modifier_list_array)
        }

        logger && console.log(`modifier_list_info_array in the getCatalogObject`, modifier_list_info_array)
        // getCatalogObjectToReturn.modifier_list_info_array = modifier_list_info_array
        /*
            look through related objects to see if there is 
            data for image and tax data
        */
        if (relatedObjects.length > 0) {
            /*
                going through related_objects array
                to find image info
            */

            let imageObject = relatedObjects.find((item) => item.type == 'IMAGE')
            let taxData = relatedObjects.find((item) => item.type == 'TAX')

            logger && console.log(`imageObject`, imageObject)
            // logger && console.log(`modifier_list`, modifier_list)

            // if there is imageObject then set imagedata
            if (imageObject) {
                getCatalogObjectToReturn.imageURL = imageObject.image_data.url
            } else {
                getCatalogObjectToReturn.imageURL = '/MenuItem/defaultImg.png'
            }


            // if there is taxdata then set tax data
            if(taxData){
                logger && console.log(`taxData for item`,taxData)
                let taxDataToSet = taxData.tax_data
                logger && console.log('taxDataToSet',taxDataToSet)
                taxDataToSet = JSON.stringify(taxDataToSet)
                getCatalogObjectToReturn.taxData = taxDataToSet
            }
        } else {
            // there are no related objects
        }
    }, (err) => {
        if (err) {
            logger && console.log(`SOMETHING WENT WRONG retrieveCatalogObject`, err)
        }
    })
    
    return getCatalogObjectToReturn
}


async function getModifiers(modifier_list_id_array) {
   
    let tempArray = []

    const promises = modifier_list_id_array.map(async(id)=>{
        logger && console.log(`Running promies for `,id)
        let tempObj = await getModifierObjectById(id)
        logger && console.log(`tempObj`, tempObj)
        tempArray.push(tempObj)
    })
    
    await Promise.all(promises);

    logger && console.log(`tempArray`, tempArray)

    let arrayToReturn = JSON.stringify(tempArray)
    // let arrayToReturn = tempArray
    return arrayToReturn
    
}


async function getModifierObjectById(id){

    let opts = {
        'includeRelatedObjects': true
    };


    let tempObj = await catalogApi.retrieveCatalogObject(id, opts).then((data) => {
        logger && console.log(`Success getting modifier object from retrieveCatalogObject`, data)
        return data

    }, (err) => {
        if (err) {
            logger && console.log(`err getting modifier object from retrieveCatalogObject`, err)
        }
    })

    return tempObj
}

async function handleCategorySelect(targetID, categorySelected, setCategorySelected,setIdOfCategorySelected){
    logger && console.log('handleCategorySelect called')
    /*
        targetID is the event target id which corresponds to a 
        category name
    */
    logger && console.log(`${targetID} clicked`, categorySelected)

    // loop through category
    for(const prop in categorySelected){
        logger && console.log('prop',prop)
        if(targetID==prop){
            categorySelected[prop].selected = true
            setIdOfCategorySelected(categorySelected[prop].id)
        }else{
            categorySelected[prop].selected = false
        }
    }

    setCategorySelected(categorySelected)
    
}

async function handleCateringCategorySelect(targetID, categorySelected, setCategorySelected,setIdOfCategorySelected){
    logger && console.log('handleCategorySelect called')
    /*
        targetID is the event target id which corresponds to a 
        category name
    */
    logger && console.log(`${targetID} clicked`, categorySelected)

    // loop through category
    for(const prop in categorySelected){
        logger && console.log('prop',prop)
        if(targetID==prop){
            categorySelected[prop].selected = true
            setIdOfCategorySelected(categorySelected[prop].id)
        }else{
            categorySelected[prop].selected = false
        }
    }

    setCategorySelected(categorySelected)
    
}

async function getImgUrl(id){
    logger && console.log(`getImgUrl fired`,id)


    let url = await axios.post('/api/getItemImg',{id:id}).then((data)=>{
        logger && console.log(`got back something from the /api/getItemImg`,data)
        return data.data
    },(err)=>{
        logger && console.log(`SOMETHING WENT WRONG GETTING IMG URL`)

        return undefined
    })

    return url

}

async function getCategories(){

    logger && console.log('running function getCategories')
    
     /*
    getCategoryID(category) will accept a string 'breakfast', lunch, sweet/snacks
    and return corresponding categoryID to pass to getItems
    */
    /*
        Gets an id based of an input
        string category
        breakfast | lunch | sweetsSnacks
    */
   


   let body = {
       "object_types": [
           "CATEGORY"
       ]
   }

   let arrayOfCategories = await catalogApi.searchCatalogObjects(body).then((data) => {

       let arrayOfCategories = data.objects.map((object)=>{
           return{
               name : object.category_data.name,
               id : object.id,
               selected : false
           }
       })

    return arrayOfCategories
   }, (err) => {
       console.error(err);
       throw err
   })


   logger && console.log('arrayOfCategories in menu', arrayOfCategories)
   
    return arrayOfCategories
}

async function getCateringCategories(){

    logger && console.log('running function getCateringCategories')
    
     /*
    getCategoryID(category) will accept a string 'breakfast', lunch, sweet/snacks
    and return corresponding categoryID to pass to getItems
    */
    /*
        Gets an id based of an input
        string category
        breakfast | lunch | sweetsSnacks
    */
   


   let body = {
       "object_types": [
           "CATEGORY"
       ]
   }

   let arrayOfCategories = await catalogApi.searchCatalogObjects(body).then((data) => {

       let arrayOfCategoriesToFilter = data.objects.filter((object)=>{
          let nameToTest = object.category_data.name

          if(nameToTest.includes('-Catering')){
            logger && console.log('nameToTest is catering',nameToTest)
            logger && console.log('object',object)
            logger && console.log('object.category_data',object.category_data.name)
            let name = object.category_data
            
            return{
                name : name,
                id : object.id,
                selected : false
            }

          }
          
       })
       logger && console.log('arrayOfCategories in filter', arrayOfCategoriesToFilter)
       arrayOfCategoriesToFilter = arrayOfCategoriesToFilter.map((object)=>{
        return{
            name : object.category_data.name,
            id : object.id,
            selected : false
        }
       })
       return arrayOfCategoriesToFilter
    // return arrayOfCategories
   }, (err) => {
       console.error(err);
       throw err
   })


   logger && console.log('arrayOfCategories for catering in menu', arrayOfCategories)
   
    return arrayOfCategories
}

async function getIndividuallyPackedCategories(){

    logger && console.log('running function getCateringCategories')
    
     /*
    getCategoryID(category) will accept a string 'breakfast', lunch, sweet/snacks
    and return corresponding categoryID to pass to getItems
    */
    /*
        Gets an id based of an input
        string category
        breakfast | lunch | sweetsSnacks
    */
   


   let body = {
       "object_types": [
           "CATEGORY"
       ]
   }

   let arrayOfCategories = await catalogApi.searchCatalogObjects(body).then((data) => {

       let arrayOfCategoriesToFilter = data.objects.filter((object)=>{
          let nameToTest = object.category_data.name

          if(nameToTest.includes('-Catering') == false){
            logger && console.log('nameToTest is catering',nameToTest)
            logger && console.log('object',object)
            logger && console.log('object.category_data',object.category_data.name)
            let name = object.category_data
            
            return{
                name : name,
                id : object.id,
                selected : false
            }

          }
          
       })
       logger && console.log('arrayOfCategories in filter', arrayOfCategoriesToFilter)
       arrayOfCategoriesToFilter = arrayOfCategoriesToFilter.map((object)=>{
        return{
            name : object.category_data.name,
            id : object.id,
            selected : false
        }
       })
       return arrayOfCategoriesToFilter
    // return arrayOfCategories
   }, (err) => {
       console.error(err);
       throw err
   })


   logger && console.log('arrayOfCategories for catering in menu', arrayOfCategories)
   
    return arrayOfCategories
}

/*
    EXPORTS
*/
module.exports.getCategoryID = getCategoryID
module.exports.getItems = getItems
module.exports.getPageId = getPageId
module.exports.getCatalogObject = getCatalogObject
module.exports.getModifiers = getModifiers
module.exports.getImgUrl = getImgUrl
module.exports.handleCategorySelect = handleCategorySelect
module.exports.getCategories = getCategories
module.exports.getCateringCategories = getCateringCategories
module.exports.getIndividuallyPackedCategories = getIndividuallyPackedCategories
module.exports.getAllCateringItems = getAllCateringItems
module.exports.getAllItems = getAllItems
module.exports.getAllIndividualPackedItems = getAllIndividualPackedItems