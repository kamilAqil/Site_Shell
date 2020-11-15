import React, { createContext, useState } from "react";

export const GeneralContext = createContext();

const GeneralContextProvider = (props) => {
  let [navAnchorEl, setNavAnchorEl] = React.useState(null);

  let setNavAnchorElement = (currentTarget) => {
    setNavAnchorEl(currentTarget);
  };

  return (
    <GeneralContext.Provider value={{ navAnchorEl, setNavAnchorElement }}>
      {props.children}
    </GeneralContext.Provider>
  );
};

export default GeneralContextProvider;
