import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import GeneralContextProvider from "src/Context/GeneralContext";
import ThemeContextProvider from "src/Context/ThemeContextProvider";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Firebase, { FirebaseContext } from "src/Context/Firebase";
import theme from "src/Theme/theme.js";
import { Provider } from "react-redux";
import store from "src/redux/store.js";
export default function MyApp(props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Greenlife Fitfoods</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeContextProvider>
        <GeneralContextProvider>
          <FirebaseContext.Provider value={new Firebase()}>
            <Provider store={store}>
              <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <Component {...pageProps} />
              </ThemeProvider>
            </Provider>
          </FirebaseContext.Provider>
        </GeneralContextProvider>
      </ThemeContextProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
