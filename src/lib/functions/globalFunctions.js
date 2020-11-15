const logger = 1;

import { TvRounded } from '@material-ui/icons';
import axios from 'axios'
import moment from 'moment';
import theme from "src/Theme/theme";
import useMediaQuery from "@material-ui/core/useMediaQuery";

export function determineStylesToUse(
  width,
  xsmallStyles,
  smallStyles,
  mediumStyles,
  largeStyles
) {
  let style = "";

  switch (width) {
    case "xs":
      // logger && console.log(`using xs style`);
      style = xsmallStyles();
      break;
    case "sm":
      // logger && console.log(`using sm style`);
      style = smallStyles();
      break;
    case "md":
      // logger && console.log(`using mediumStyles style`);
      style = mediumStyles();
      break;
    case "lg":
      // logger && console.log(`using lg style`);
      style = largeStyles();
      break;
    case "xl":
      // logger && console.log(`using lg style for xl`);
      style = largeStyles();
      break;
    default:
      // logger && console.log(`using xs style`);
      style = xsmallStyles();
      break;
  }

  return style;
}

export function useWidth() {
  // const theme = useTheme();

  const keys = [...theme.breakpoints.keys].reverse();
  return (
    keys.reduce((output, key) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.up(key));
      return !output && matches ? key : output;
    }, null) || "xs"
  );
}

export function getDateForConfirmation(){

}



export function getTimeForConfirmation(time){

  
  logger && console.log(`getTimeForConfirmation for `,time)
  // let tempTime = moment(time)
  // let localTime = tempTime.format('LT')
  // logger && console.log(`tempTime, `, tempTime)
  // logger && console.log(`localTime, `, localTime)
  let day = moment(time).calendar()
  logger && console.log(`day`, day)
  day = day.split(" ",1)

  logger && console.log(`getTimeForConfirmation for `, time)
  let formattedTime = moment(time).format("h:mm")
  logger && console.log(`formattedTime`, formattedTime)
  let data = {
    day: day,
    time: formattedTime
  }
  return data
}


export function truncateLineItem(itemName){

  let length = itemName.length

  

  console.log(length)

  if (length > 20) {
    console.log('going to truncate string')
    itemName = itemName.slice(0, 20)
    itemName = itemName + '...'
    console.log(itemName)
  }

  return itemName
}


export function emailIsValid (email) {
  return /\S+@\S+\.\S+/.test(email)
}

export function phonenumberIsValid (inputtxt){
  var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

  return re.test(inputtxt);
}

export function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


export function capitalizeTheFirstLetterOfEachWord(words) {
  var separateWord = words.toLowerCase().split(' ');
  for (var i = 0; i < separateWord.length; i++) {
     separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
     separateWord[i].substring(1);
  }
  return separateWord.join(' ');
}


export async function handleEmail(customerName,customerEmail, orderNumber, fb,url) {
  logger && console.log('going to handle Email for', orderNumber)

  // check if order exists in orders
  fb.database.ref('orders/' + orderNumber).once('value')
    .then((snapshot) => {
      logger && console.log('check if order exists in orders', snapshot.val())
      let order = snapshot.val()
      /*
        if order exists check if email has been sent
      */
      if (order) {
        // check if order has been emailed
        logger && console.log('order',order)
        if(order.emailed == false){
          logger && console.log('NEED TO EMAIL USER')
          let data = {
            email : customerEmail, 
          orderNumber : orderNumber,
          url : url,
          customerName : customerName,
          orderNumber : orderNumber
          }
           axios.post('/api/emailUserOrder',data).then((data)=>{
            console.log(`/api/emailUserOrder axios post successful`,data)
             // update firebase fielda
          let updates = {};
          updates['orders/' + orderNumber] = {
            emailed: true,
            email : customerEmail
          }
          logger && console.log('updates',updates)
          fb.database.ref().update(updates, (err)=>{
            if (err) {
              // The write failed...
              logger && console.log('SOMETHING WENT WRONG UPDATING EMAILED STATUS')
            } else {
              // Data saved successfully!
              logger && console.log('UPDATED EMAILED STATUS')
            }
          })
          }).catch((err)=>{
            console.log(err)
            throw err
          })
        }else{
          logger && console.log('user has been emailed')
        }
      } else {
        // creating order
        fb.database.ref('orders/' + orderNumber).set({
          emailed: false,
          email : customerEmail
        })
        // going to email user after new entr
        let data = {
          email : customerEmail, 
          orderNumber : orderNumber,
          url : url,
          customerName : customerName,
          orderNumber : orderNumber
        }
          axios.post('/api/emailUserOrder',data).then((data)=>{
          console.log(`/api/emailUserOrder axios post successful`,data)
          // update firebase fielda
          let updates = {};
          updates['orders/' + orderNumber] = {
            emailed: true,
            email : customerEmail
          }
          logger && console.log('updates',updates)
          fb.database.ref().update(updates, (err)=>{
            if (err) {
              // The write failed...
              logger && console.log('SOMETHING WENT WRONG UPDATING EMAILED STATUS')
            } else {
              // Data saved successfully!
              logger && console.log('UPDATED EMAILED STATUS')
            }
          })
        }).catch((err)=>{
          console.log(err)
          throw err
        })
      }

    })
    .catch((err) => {
      logger && console.log('err checking if order exists in orders', err)
    })


}