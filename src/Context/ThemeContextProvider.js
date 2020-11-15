import React, { createContext, useState } from "react";

// functions
import { useWidth } from "src/lib/functions/globalFunctions";

export const ThemeContext = createContext();

const ThemeContextProvider = (props) => {
  let width = useWidth();
  const [siteWidth, setSiteWidth] = useState(width);

  const setComponentWidth = () => {
    setSiteWidth(width);
  };

  return (
    <ThemeContext.Provider value={{ siteWidth, setComponentWidth }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
