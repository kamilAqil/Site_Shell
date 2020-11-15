import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

let theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 320,
      sm: 375,
      md: 768,
      lg: 1024,
      xl: 1920,
    },
  },
  palette: {
    accent: {
      main: "#00B2A9"
    },
    addToCartCTA: {
      main: '#00B2A9'
    },
    addToOrderButtonBorder: {
      main: "#1D252D"
    },
    greyText : {
      main : '#717C7D'
    },
    beetRed: {
      main: "#A7184B"
    },
    simpleGreyBorder : {
      main : '#717C7D'
    },
    blur: {
      main: '#C6CFD0'
    },
    borderOutline: {
      main: "#1D252D"
    },
    cartBorderColor: {
      main: "#1D252D"
    },
    cartButtonBorder: {
      main: "#1D252D"
    },
    cartItemContainer: {
      main: '#1D252D'
    },
    cartItemTextColor: {
      main: "#00B2A9"
    },
    cartTotalBorderTop: {
      main: "#393A3B"
    },
    categoryTextBlurred: {
      main: '#C6CFD0'
    },
    checkBoxPrimaryColor: {
      main: "#EB832E"
    },
    collapsableMenuItem: {
      main: "#1D252D"
    },
    ctaBackground: {
      main: "#257531"
    },
    darkText: {
      main: "#242D33"
    },
    darkTextColor: {
      main: '#242D33'
    },
    deleteButtonTextColor: {
      main: "#459734"
    },
    deliveryPartnersHeading: {
      main: '#459734'
    },
    error: {
      main: "#D54343"
    },
    footer: {
      main: "#1D252D"
    },
    footerText: {
      main: '#FFFFFF'
    },
    howItWorksHeaderBottomBorderMain: {
      main: "#1D252D"
    },
    howItWorksOrText: {
      main: "#F0BB3E"
    },
    howItWorksTitleSectionText: {
      main: "#00B2A9"
    },
    howItWorksTitleText: {
      main: "#A7184B"
    },
    imgContainer: {
      main: '#717C7D'
    },
    itemDetails: {
      main: "#00B2A9"
    },
    itemModifier: {
      main: '#1D252D'
    },
    limeGreen: {
      main: "	#32CD32	"
    },
    line_items_container: {
      main: '#1D252D'
    },
    mainTextColor: {
      main: "#717C7D"
    },
    menuItem: {
      main: "#FFFFFF"
    },
    menuItemBackButtonContainer: {
      main: "#717C7D"
    },
    menuItemBackground: {
      main: "#CDD3A8"
    },
    menuItemContainer: {
      main: "#00B2A9"
    },
    menuItemDescriptionBackButton: {
      main: '#D54343'
    },
    menuitemDetails: {
      main: '#1D252D'
    },
    menuItemTitle: {
      main: "#393A3B"
    },
    menuPageTitle: {
      main: '#393A3B'
    },
    menuTitle: {
      main: '#00B2A9'
    },
    menuTypeTitle: {
      main: "#393A3B"
    },
    navBarBackground: {
      main: '#FFFFFF'
    },
    numberOfItemsInCartBorder: {
      main: "#1D252D"
    },
    numberOfItemsInCartText: {
      main: '#FFFFFF'
    },
    numOfItemsInCartOnTopOfHamburgerMenuContainer: {
      main: "#A7184B"
    },
    pageBoarder: {
      main: '#1D252D'
    },
    payForOrderButton: {
      main: '#00B2A9'
    },
    placeOrderButton: {
      main: '#00B2A9'
    },
    primary: {
      main: "#459734"
    },
    redSquareBackground: {
      main: "#F37259"
    },
    removeItemButtonBorder: {
      main: "#A7184B"
    },
    sectionHeaderText: {
      main: "#459734"
    },
    seeOurMenuCTA: {
      main: "#00B2A9"
    },
    seeOurMenuCTAText: {
      main: "#FFFFFF"
    },
    selectHeaderText: {
      main: '#F0BB3E'
    },
    signUpButtonBackground: {
      main: "#393A3B"
    },
    skyBlue: {
      main: `#89c9b8`
    },
    subtotalSectionContainer: {
      main: '#FFFFFF'
    },
    violet: {
      main: "#EE82EE"
    },
    welcomeSectionBackground: {
      main: "#00473B"
    },
    welcomeSectionBulletPoint: {
      main: "#CDD3A8"
    },
    welcomeSectionOrderNowButton: {
      main: "#FFFFFF"
    },
    welcomeSectionOrderNowCTAText: {
      main: "#00473B"
    },
    white: {
      main: "#FFFFFF"
    },
    whyGreenlifeReason: {
      main: "#A7184B"
    }
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
  
  },
  
});

theme = responsiveFontSizes(theme)



// // h1
// theme.typography.h1 = {}
// // h2
// theme.typography.h2 = {}
// // h3
// theme.typography.h3 = {}
// // h4
// theme.typography.h4 = {}
// // h5
// theme.typography.h5 = {}
// // h6
// theme.typography.h6 = {}
// // subtitle1
// theme.typography.subtitle1 = {}
// // subtitle2
// theme.typography.subtitle2 = {}
// // body1
// theme.typography.body1 = {}
// // body2
// theme.typography.body2 = {}
// // button
theme.typography.button = {
  fontFamily: "'Poppins', sans-serif",
  [theme.breakpoints.up("xs")]: {
    fontSize : '1rem'
  },
  [theme.breakpoints.up("sm")]: {
    fontSize : '1.2rem'
  },
  [theme.breakpoints.up("md")]: {
    fontSize : '1.3rem'
  },
  [theme.breakpoints.up("lg")]: {
    fontSize : '1.3rem'
  },
}
// // caption
// theme.typography.caption = {}
// // overline
// theme.typography.overline = {}


export default theme;
